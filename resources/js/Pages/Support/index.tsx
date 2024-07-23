import { stdInit, upc0 } from '@assets/fn/settings';
import Button from '@components/Button';
import { useWrapper } from '@context/AuthenticatedContext';
import { Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@layouts/AuthenticatedLayout';
import { STData } from '@typings/global';
import { PageProps } from '@typings/index';
import { FilterMatchMode } from 'primereact/api';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { FC, useContext, useState } from 'react';
import { BsGear } from 'react-icons/bs';
import MxDropCheck from './Partials/MxDropCheck';
import { showIf } from '@assets/fn';
import NoData from '@widgets/NoData';

const Support: React.FC<SupportProps> = ({ auth, tickets, ...props }) => {
    // console.log(tickets)
    //--- code here ---- //
    return (
        <AuthenticatedLayout
            user={auth.user}
            title='Support'
            pusher={true}
        >
            <Page tickets={tickets} />
        </AuthenticatedLayout>
    );
}

interface SupportProps extends PageProps {
    tickets: any[]
}

const Page: FC<PageProp> = ({ tickets }) => {
    //VARS
    const defaultOpts = ["id", "date", "subject", "category", "status"];

    //

    //USESTATES
    const [tkt, settkt] = useState(tickets);
    const ticketUpdate = useState(0);
    const [sOptions, setSoptions]: [
        any,
        React.Dispatch<React.SetStateAction<any>>
    ] = useState([...defaultOpts]);
    const [searchV, setSearchV] = useState("");
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    //

    //OTHER VARS
    /**Local TIckets */
    const ltkt: STData[] = stdInit(tkt);
    //

    //FXNS
    const setFilter = (value: any) => {
        let _filters = { ...filters };
        _filters["global"].value = value;
        setFilters(_filters);
    };

    const onSChange = (e: any) => {
        setSearchV(e.target.value);
        setFilter(e.target.value);
    };
    //

    const colstyle = {
        gen: {
            maxWidth: "8rem",
        },
        id: {},
        date: {},
        subject: {
            maxWidth: "30rem",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
        },
        category: {},
        status: {},
    };

    //RETURN SOMBORY
    return (
        <div className="mx-spt-data-tbl">
            {/* @ts-ignore */}
            {showIf(tickets.length > 0, () => {
                return <DataTable
                    filters={filters}
                    globalFilterFields={sOptions}
                    selectionMode={"single"}
                    dataKey="id"
                    //@ts-ignore
                    onSelectionChange={(e) => router.visit(e.value.id)}
                    paginator
                    rows={9}
                    alwaysShowPaginator={false}
                    value={ltkt}
                    header={
                        <div className="spt-head">
                            <Button>Create New Ticket</Button>

                            <div className="sb-box">
                                <input
                                    value={searchV}
                                    onChange={onSChange}
                                    placeholder="Search All Columns"
                                />
                                {searchV ? (
                                    <i
                                        onClick={(e) => {
                                            setSearchV("");
                                            setFilter("");
                                        }}
                                        className="pi pi-times"
                                    ></i>
                                ) : undefined}
                                <MxDropCheck
                                    defaultList={defaultOpts}
                                    optionState={[sOptions, setSoptions]}
                                    icon={<BsGear className="gear-icon" />}
                                />
                            </div>
                        </div>
                    }
                >
                    {Object.keys(ltkt[0])?.map((ky) => {
                        if (ky == "date") {
                            return (
                                <Column
                                    field={ky}
                                    header={upc0(ky)}
                                    body={(obj) =>
                                        new Date(obj.date).toLocaleDateString(undefined, {
                                            dateStyle: "medium",
                                        })
                                    }
                                    bodyStyle={{ ...colstyle.gen, ...colstyle[ky] }}
                                    key={ky}
                                />
                            );
                        }
                        return (
                            <Column
                                field={ky}
                                header={upc0(ky)}
                                //@ts-ignore
                                bodyStyle={{ ...colstyle.gen, ...colstyle[ky] }}
                                key={ky}
                            />
                        );
                    })}
                    <Column body={<i className="pi pi-angle-right"></i>}></Column>
                </DataTable>
            }), <NoData>
                    <>No Tickets</>
                    <>All Tickets will be displayed here</>
                    <Button shape='pill'>Create Ticket</Button>
                </NoData>}
        </div>
    );

}

interface PageProp {
    tickets: any[]
}

export default Support
