import React, { useEffect, useState, CSSProperties } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { sendMail } from '../../functions/customer';
import { toast } from 'react-toastify';
import { getCompany } from '../../functions/company';
import { Company as CompanyModel } from '../../models/company';
import ReactDOMServer from 'react-dom/server';

interface MailProps {
    email: string | undefined;
    name: string | undefined;
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
        maxWidth: '100%',
        height: 'auto',
        borderRadius: '50%',
    },
    body: {
        paddingLeft: '20px',
        paddingRight: '20px',
    },
};

const Mail: React.FC<MailProps> = ({ email, name }) => {
    const [company, setCompany] = useState<CompanyModel | undefined>();

    useEffect(() => {
        getCompany(1).then(company => {
            setCompany(company);
        });
    }, []);

    const renderTooltip = (props: any) => (
        <Tooltip id="button-tooltip" {...props}>
            Enviar un correo para probar el mail
        </Tooltip>
    );

    const cuerpo = () => (
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
            <div style={styles.row}>
                <div style={styles.col}>
                    <p>Estimado/a, {name && <b>{name}</b>}</p>
                    <p>Este es el contenido del correo. Aquí puedes agregar más información relevante.</p>
                    <p>Saludos,</p>
                    <hr />
                    <p><b>{company?.name}</b></p>
                </div>
            </div>
        </div>
    );

    const SendMail = (mail: string | undefined) => {
        if (mail && company) {
            try {
                const cuerpoHTML = ReactDOMServer.renderToString(cuerpo());
                sendMail(mail, cuerpoHTML, 'test').then(resp => {
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
        <>
            {email && (
                <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip}
                >
                    <div className='text-success' role="button" onClick={() => SendMail(email)}>
                        <i className="bi bi-envelope"></i>
                        <p className='text-success'>{email}</p>
                    </div>
                </OverlayTrigger>
            )}
            {!email && (
                <div className='text-warning'>
                    <p> - </p>
                </div>
            )}
        </>
    );
};

export default Mail;