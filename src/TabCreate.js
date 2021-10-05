import React from 'react';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ModalAddWallet from './ModalAddWallet';
import crypto from 'crypto';
import { sensitiveHeaders } from 'http2';

export default function TabCreate(){
    const [wallets, setWallets] = React.useState([]);
    const [name, setName] = React.useState("");
    const [showModal, setShowModal] = React.useState(false);

    return <Form>
        <legend className="small">Create your Wallets Encrypted File</legend>
    
        <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control value={name} onChange={ e => setName(e.target.value) } />
        </Form.Group>

        <Table>
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Coin / Network</th>
                    <th>Seed</th>
                    <th>#</th>
                </tr>
            </thead>

            <tbody>
                { (wallets || []).map( (wallet, idx) => {
                    return <tr key={idx}>
                        <td>{wallet.description}</td>
                        <td>{wallet.coin}</td>
                        <td>{wallet.seed}</td>
                        <td>
                            <Button variant="danger" title="Delete">X</Button>
                        </td>
                    </tr>
                }) }
            </tbody>
        </Table>

        <Form.Group>
            <Form.Label>Actions</Form.Label>
            <div className="d-flex">
                <Button className="mr-2" variant="secondary" 
                    disabled={wallets.length <= 0} onClick={()=>{
                        let secret = window.prompt("The Secret to Encrypt the File ! Write it Down, is the Only way to reverse the encryption !!!");
                        if(!secret || secret.length <=0) {
                            window.alert("Secret Invalid !!!");
                            return;
                        }

                        // https://www.section.io/engineering-education/data-encryption-and-decryption-in-node-js-using-crypto/
                        // https://attacomsian.com/blog/nodejs-encrypt-decrypt-data
                        const iv = crypto.randomBytes(16);
                        const cipher = crypto.createCipheriv('aes-256-cbc', secret, iv);
                        const encrypted = Buffer.concat([cipher.update(JSON.stringify({ name, wallets })), cipher.final()]);

                        if(secret.length < 32 ) {
                            if(!window.confirm(`"Your secret is too short [${secret.length}] ! Recomended Length is 32+. Would like to continue ?"`)) return;
                            console.log("## SECRET:", secret);
                            console.log("## IV    :", iv.toString("hex"));
                            secret = iv.toString('hex').substring(0, 32-secret.length) + secret;
                            console.log("NEW SECRET:", secret.length, secret);

                        }

                        // https://stackoverflow.com/questions/28464449/how-to-save-json-data-locally-on-the-machine
                        var a = document.createElement('a');
                        a.setAttribute('href', 'data:text/plain;charset=utf-8,'+ iv.toString('hex') + "\n" + encrypted.toString('hex'));
                        a.setAttribute('download', "lhwallet"+ (new Date()).getTime() + ".txt");
                        a.click()
                    }}>Generate File</Button>
                &nbsp;&nbsp;
                <Button className="mr-2" variant="primary" onClick={()=>{
                    setShowModal(true);
                }}>Add Wallet</Button>
            </div>
        </Form.Group>

        { showModal ? <ModalAddWallet show={showModal} onHide={setShowModal} callback={ wallet =>{
            const wallets2 = [...wallets];
            wallets2.push(wallet);
            setWallets(wallets2);
            setShowModal(false);
        }} /> : false }
    </Form>
}