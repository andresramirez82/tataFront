import React, { useEffect, useState } from "react";
import { getCompanyLogin } from "@functions/company";
import { Company } from "@models/company";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { ErrorResponse } from "@models/models";

const CompayHead: React.FC = () => {
    const [company, setcompany] = useState<Company>()
    useEffect(() => {
        getCompanyLogin().then(com => {
            setcompany(com);
        }

        ).catch((err: AxiosError<ErrorResponse>) => {
            toast.error(`${err.response?.data.message}`)
        });
    }, [])

    return (
        <>
            {company && (
                <>
                    <img src={company.logo} alt={`Logo de ${company.name}`} />
                    <h3>{company.name}</h3>
                    <h2>{company.cuil}</h2>
                </>
            )}
        </>
    );
}
export default CompayHead;