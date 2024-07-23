import { Dialog } from "primereact/dialog";
import "@styles/pages/mxdropcheck.scss";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { useRef, useState } from "react";
import Card from "@components/Card";

function MxDropCheck({ icon, optionState, defaultList }: any) {
    let checkd = true;
    const cardRef = useRef(null);
    const [options, setOptions] = optionState;
    const [visibleStatus, setVStatus] = useState(false);
    let currentList: any[] = options;
    let checkInit = {} as Record<string, any>;

    defaultList?.forEach((id: any) => {
        checkInit[id] = options?.includes(id);
    });

    const [check, setCheck] = useState({ ...checkInit });

    const handleCheck = (id: any, checked: any) => {
        if (checked) {
            if (!currentList.includes(id)) {
                currentList.push(id);
            }
        } else {
            if (currentList.includes(id) && currentList.length > 1) {
                currentList.splice(currentList.indexOf(id), 1);
            } else {
                return null;
            }
        }
        setCheck({ ...check, [id]: checked });
    };
    return (
        <div
            className="mxdc-parent"
            onClick={(e) => {
                if (
                    !(e.target as HTMLElement)?.offsetParent?.className?.includes(
                        "drop-card"
                    )
                ) {
                    setVStatus(!visibleStatus);
                }
            }}
        >
            {icon}
            {visibleStatus ? (
                <Card
                    className="drop-card"
                >
                    {defaultList.map((id: any) => (
                        <div className="check-grp" key={id}>
                            <span className="id">{id}</span>
                            <input
                                checked={check[id]}
                                type="checkbox"
                                onChange={(e) => {
                                    handleCheck(id, e.target.checked);
                                }}
                            />
                        </div>
                    ))}

                    <div className="btn-parent">
                        <div
                            onClick={() => {
                                setVStatus(false);
                                if (currentList.length > 0) {
                                    setOptions(currentList);
                                }
                            }}
                            className="btn"
                        >
                            Apply
                        </div>
                    </div>
                </Card>
            ) : undefined}
        </div>
    );
}

export default MxDropCheck;
