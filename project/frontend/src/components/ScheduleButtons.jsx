import React from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

import ImageParaPet from "../assets/image_para_pet.png";
import ImageParaVoce from "../assets/image_para_voce.png";

export default function ScheduleButton({modalButtons, setModalButtons}) {

    const resolucaoAgendarXY = 150;

    return (
        <Modal
            className="modal_buttons"
            show={modalButtons}
            onHide={() => {
                setModalButtons(false);
            }}
            centered
        >
            <div id="modais">
                <Link id={"para_voce"} to={"/fichapessoa"}>
                    <div className="button_container_navigate_schedule">
                        Para Você
                        <div className="button_consulta_image">
                            <img
                                src={ImageParaVoce}
                                alt="Para Você"
                                width={resolucaoAgendarXY}
                                height={resolucaoAgendarXY}
                            />
                        </div>
                    </div>
                </Link>
                <div style={{ width: 50, backgroundColor: "white" }} />
                <Link id={"para_pet"} to={"/fichapet"}>
                    <div className="button_container_navigate_schedule">
                        Para Pet
                        <div className="button_consulta_image">
                            <img
                                src={ImageParaPet}
                                alt="Para pet"
                                width={resolucaoAgendarXY}
                                height={resolucaoAgendarXY}
                            />
                        </div>
                    </div>
                </Link>
            </div>
        </Modal>
    );
}
