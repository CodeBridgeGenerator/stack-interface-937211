import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import ProjectLayout from "../Layouts/ProjectLayout";

import SchemaPathLogoPage from "../SchemaPathLogoPage/SchemaPathLogoPage";

const SingleSchemaPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    const [stack, setStack] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("schema")
            .get(urlParams.singleSchemaId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"stack"] }})
            .then((res) => {
                set_entity(res || {});
                const stack = Array.isArray(res.stack)
            ? res.stack.map((elem) => ({ _id: elem._id, rootPath: elem.rootPath }))
            : res.stack
                ? [{ _id: res.stack._id, rootPath: res.stack.rootPath }]
                : [];
        setStack(stack);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Schema", type: "error", message: error.message || "Failed get schema" });
            });
    }, [props,urlParams.singleSchemaId]);


    const goBack = () => {
        navigate("/schema");
    };

    return (
        <ProjectLayout>
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Schema</h3>
                </div>
                <p>schema/{urlParams.singleSchemaId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Name</label><p className="m-0 ml-3" >{_entity?.name}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm">Stack</label>
                    {stack.map((elem) => (
                        <Link key={elem._id} to={`/stackschema/${elem._id}`}>
                            <div className="card">
                                <p className="text-xl text-primary">{elem.rootPath}</p>
                            </div>
                        </Link>
                    ))}</div>

                    <div className="col-12">&nbsp;</div>
                    <div className="col-12 md:col-6 lg:col-3">
                        <Tag value="created By:"></Tag>
                        <p className="m-0 ml-3">{_entity?.createdBy?.name}</p>
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                        <Tag value="created At:"></Tag>
                        <p className="m-0 ml-3">{moment(_entity?.createdAt).fromNow()}</p>
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                        <Tag value="last Updated By:"></Tag>
                        <p className="m-0 ml-3">{_entity?.updatedBy?.name}</p>
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                        <Tag value="updated At:"></Tag>
                        <p className="m-0 ml-3">{moment(_entity?.updatedAt).fromNow()}</p>
                    </div>
                </div>
            </div>
        </div>
        <SchemaPathLogoPage/>
        </ProjectLayout>
    );
};

const mapState = (state) => {
    const { user, isLoggedIn } = state.auth;
    return { user, isLoggedIn };
};

const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(SingleSchemaPage);
