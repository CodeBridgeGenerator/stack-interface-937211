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
const databaseArray = ["A","B","C","D","E","F","G","H"];
const databaseOptions = databaseArray.map((x) => ({ name: x, value: x }));
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

const SchemaCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [stack, setStack] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [stack], setError);
        }
        set_entity({...init});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.name)) {
                error["name"] = `Name field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            name: _entity?.name,stack: _entity?.stack?._id,database: _entity?.database,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("schema").create(_data);
        const eagerResult = await client
            .service("schema")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "stack",
                    service : "stackschema",
                    select:["rootPath"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Schema updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Schema" });
        }
        setLoading(false);
    };

    useEffect(() => {
                    // on mount stackschema
                    client
                        .service("stackschema")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleStackschemaId } })
                        .then((res) => {
                            setStack(res.data.map((e) => { return { name: e['rootPath'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Stackschema", type: "error", message: error.message || "Failed get stackschema" });
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

    const stackOptions = stack.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Schema" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="schema-create-dialog-component">
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="name">Name:</label>
                <InputText id="name" className="w-full mb-3 p-inputtext-sm" value={_entity?.name} onChange={(e) => setValByKey("name", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["name"]) ? (
              <p className="m-0" key="error-name">
                {error["name"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="stack">Stack:</label>
                <Dropdown id="stack" value={_entity?.stack?._id} optionLabel="name" optionValue="value" options={stackOptions} onChange={(e) => setValByKey("stack", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["stack"]) ? (
              <p className="m-0" key="error-stack">
                {error["stack"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="database">Database:</label>
                <Dropdown id="database" value={_entity?.database} options={databaseOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("database", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["database"]) ? (
              <p className="m-0" key="error-database">
                {error["database"]}
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

export default connect(mapState, mapDispatch)(SchemaCreateDialogComponent);
