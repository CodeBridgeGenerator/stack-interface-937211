import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../services/restClient";
import _ from "lodash";
import initilization from "../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
const apptempArray = ["A","B","C","D","E","F"];
const apptempOptions = apptempArray.map((x) => ({ name: x, value: x }));
const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
      if (Object.hasOwnProperty.call(errorObj.errors, key)) {
        const element = errorObj.errors[key];
        if (element?.message) {
          errMsg[key] = element.message;
        }
      }
    }
    return errMsg.length ? errMsg : errorObj.message ? { error : errorObj.message} : {};
};

const AppGenTempCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [AppStackName, setAppStackName] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [AppStackName], setError);
        }
        set_entity({...init});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
        
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            AppStackName: _entity?.AppStackName?._id,apptemp: _entity?.apptemp,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("appGenTemp").create(_data);
        const eagerResult = await client
            .service("appGenTemp")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "AppStackName",
                    service : "stackName",
                    select:["appName"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info AppGenTemp updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in AppGenTemp" });
        }
        setLoading(false);
    };

    useEffect(() => {
                    // on mount stackName
                    client
                        .service("stackName")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleStackNameId } })
                        .then((res) => {
                            setAppStackName(res.data.map((e) => { return { name: e['appName'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "StackName", type: "error", message: error.message || "Failed get stackName" });
                        });
                }, []);

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    const AppStackNameOptions = AppStackName.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create AppGenTemp" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="appGenTemp-create-dialog-component">
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="AppStackName">AppStackName:</label>
                <Dropdown id="AppStackName" value={_entity?.AppStackName?._id} optionLabel="name" optionValue="value" options={AppStackNameOptions} onChange={(e) => setValByKey("AppStackName", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["AppStackName"]) ? (
              <p className="m-0" key="error-AppStackName">
                {error["AppStackName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="apptemp">Apptemp:</label>
                <Dropdown id="apptemp" value={_entity?.apptemp} options={apptempOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("apptemp", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["apptemp"]) ? (
              <p className="m-0" key="error-apptemp">
                {error["apptemp"]}
              </p>
            ) : null}
          </small>
            </div>
            <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(AppGenTempCreateDialogComponent);
