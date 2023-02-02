const USPS = require('usps-webtools');
const axios = require('axios').default;
const express = require('express')
const router = express.Router()
const xmlbuilder2 = require('xmlbuilder2')
router.get('/uspsAddressCheckAPI', async (req, response) => {
    // Address check in USPS
    const usps = new USPS({
        server: 'http://production.shippingapis.com/ShippingAPI.dll',
        userId: "973COLAN6213",
        ttl: 10000 //TTL in milliseconds for request
    });
    usps.verify({
        street1: '322 3rd st.',
        street2: 'Apt 2',
        city: 'San Francisco',
        state: 'CA',
        zip: '94103'
    }, function (err, address) {
        if (err)
            throw err;
        // console.log("resultant Address: ", address)
    });

    var xmlCode = '<AddressValidateRequest USERID="973COLAN6213"><Address><Address1>Suite 6100</Address1><Address2>185 Berry St</Address2><City>San Francisco</City><State>CA</State><Zip5>94556</Zip5><Zip4></Zip4></Address></AddressValidateRequest>'

    // var root = xmlbuilder2.create({ version: '1.0' })
    //     .ele('AddressValidateRequest', { USERID: "973COLAN6213" })
    //     .ele('Address')
    //     .ele('Address1').txt('Suite 6100').up()
    //     .ele('Address2').txt('185 Berry St').up()
    //     .ele('City').txt('San Francisco').up()
    //     .ele('State').txt('CA').up()
    //     .ele('Zip5').txt('32545').up()
    //     .ele('Zip4').up()
    //     .up()
    //     .up();

    // const xml = root.end({ prettyPrint: true });
    // console.log("xml---", xml);

    // let uspsURL = "http://production.shippingapis.com/ShippingAPI.dll?API=Verify&xml=" + encodeURIComponent(xml);
    let uspsURL = 'https://secure.shippingapis.com/ShippingAPI.dll?API=Verify&xml=' + encodeURIComponent(xmlCode);

    axios.get(uspsURL).then(function (res) {
        const obj = xmlbuilder2.convert(res.data, { format: "object" })
        // console.log("obj--", obj)
        response.status(200).json({ message: "success", address: obj })
    }).catch(function (err) {
        response.status(200).json({ message: "failed", err: err })
        // console.log("err", err)
    })
})


module.exports = router