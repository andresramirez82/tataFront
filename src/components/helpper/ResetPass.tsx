import React, { useEffect, useState, CSSProperties } from 'react';
import { sendMail } from '@functions/customer';
import { toast } from 'react-toastify';
import { getCompany } from '@functions/company';
import { Company as CompanyModel } from '@models/company';
import ReactDOMServer from 'react-dom/server';
import { resetPass, generarPassword } from "@functions/User";
import { AxiosError } from "axios";
import { ErrorResponse } from "@models/models";

interface MailProps {
    email: string | undefined;
    name: string | undefined;
    idUser: number;
}

export const styles: { [key: string]: CSSProperties } = {
    card: {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        maxWidth: '600px',
        margin: '20px auto',
        fontFamily: 'Arial, sans-serif',
    },
    row: {
        display: 'flex',
        width: '100%',
    },
    col: {
        flex: 1,
        padding: '8px',
    },
    logo: {
        padding: '8px',
        flex: '0 0 50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoImg: {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
    },
    body: {
        paddingLeft: '20px',
        paddingRight: '20px',
    },
    icon: {
        width: '50px'
    }
};

const ResetMail: React.FC<MailProps> = ({ email, name, idUser }) => {
    const [company, setCompany] = useState<CompanyModel | undefined>();

    useEffect(() => {
        getCompany(1).then(company => {
            setCompany(company);
        });
    }, []);

    const cuerpo = (pass: string) => (
        <div style={styles.card}>
            <div style={styles.row}>
                <div style={styles.logo}>
                    <img style={styles.logoImg} width={'100px'} src={company?.logo} alt={`Logo ${company?.name}`} />
                </div>
                <div style={styles.col}>
                    <h2>{company?.name}</h2>
                    <h3>{company?.phone} {company?.address}</h3>

                </div>
                <div style={styles.col}>

                </div>
            </div>
            <hr/>
            <div style={styles.row}>
                <div style={styles.logoImg}>
                    <img style={styles.icon} src='https://e7.pngegg.com/pngimages/684/839/png-clipart-password-computer-icons-unlock-icon-cdr-area.png' alt='correo'></img>
                </div>
            </div>
            <div style={styles.row}>
                <div style={styles.col}>
                    <p>Estimado/a, {name && <b>{name}</b>}</p>
                    <p>Se le reseteó su password al siguiente <b>{pass}</b>, por favor no comparta con nadie este password.</p>
                    <p>Saludos,</p>
                    <hr />
                    <p><b>{company?.name}</b></p>
                </div>
            </div>
        </div>
    );

    const resetUser = async () => {
        const newpass = generarPassword(10);
        resetPass(idUser, newpass).then( ()  => {
            navigator.clipboard.writeText(newpass);
            SendMail(email, newpass);
        }).catch((err: AxiosError<ErrorResponse>) => {
            toast.error(`${err.response?.data.message}`)
        })
    }

    const SendMail = (mail: string | undefined, pass: string) => {
        if (mail && company) {
            try {
                const cuerpoHTML = ReactDOMServer.renderToString(cuerpo(pass));
                sendMail(mail, cuerpoHTML, 'Reset Pass').then(resp => {
                    toast.success(`${resp.message}`);
                }).catch(err => {
                    toast.error(`${err.message}`);
                });
            } catch (error) {
                toast.error('Error sending email');
            }
        }
    };

    return (
        <button className="btn btn-secondary" onClick={resetUser}><span className='bi bi-lock' /> Reset</button>
    );
};

export default ResetMail;