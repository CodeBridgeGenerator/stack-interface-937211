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

const AppvalidateCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [AppName, setAppName] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [AppName], setError);
        }
        set_entity({...init});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.appValidation)) {
                error["appValidation"] = `AppValidation field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            AppName: _entity?.AppName?._id,appValidation: _entity?.appValidation,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("appvalidate").create(_data);
        const eagerResult = await client
            .service("appvalidate")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "AppName",
                    service : "stackName",
                    select:["appName"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Appvalidate updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Appvalidate" });
        }
        setLoading(false);
    };

    useEffect(() => {
                    // on mount stackName
                    client
                        .service("stackName")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleStackNameId } })
                        .then((res) => {
                            setAppName(res.data.map((e) => { return { name: e['appName'], value: e._id }}));
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

    const AppNameOptions = AppName.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Appvalidate" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="appvalidate-create-dialog-component">
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="AppName">AppName:</label>
                <Dropdown id="AppName" value={_entity?.AppName?._id} optionLabel="name" optionValue="value" options={AppNameOptions} onChange={(e) => setValByKey("AppName", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["AppName"]) ? (
              <p className="m-0" key="error-AppName">
                {error["AppName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="appValidation">AppValidation:</label>
                <InputText id="appValidation" className="w-full mb-3 p-inputtext-sm" value={_entity?.appValidation} onChange={(e) => setValByKey("appValidation", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["appValidation"]) ? (
              <p className="m-0" key="error-appValidation">
                {error["appValidation"]}
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

export default connect(mapState, mapDispatch)(AppvalidateCreateDialogComponent);
