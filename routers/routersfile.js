/**
    * Referance code: https://www.digitalocean.com/community/tutorials/how-to-use-aggregations-in-mongodb
*/

const StudentSchema = require('../schema/StudentSchema')
const DATABASE_CONNECTION_STRING = "mongodb+srv://Flutter_data:2ke1pwZ7TcCKf4xT@cluster0.5kghi.mongodb.net/"
const express = require('express')
const router = express.Router()

let MongoClient = require('mongodb').MongoClient;

router.get('/aggregatefunc', async (req, res) => {

    MongoClient.connect(DATABASE_CONNECTION_STRING, function (err, db) {
        if (err) throw err;
        var Collection = db.db("AggregateFunc").collection("CountryDetails");

        /** 1)
         *  -- find and fineone --
         * To find only a single data means use findone({email:"ema@gmail.com"}), its result will be in single object
         * To find a data and want the result in array means, use find({country:"india"}).toArray()
         * Also to find all data means, just use find({}).toArray()
         */

        // Collection.find({ continent: "Asia" }).toArray(
        //     async function (err, data) {
        //         if (err)
        //             return res.status(400).json({ msg: 'something went wrong', err })
        //         return res.status(200).json({ msg: 'success', data }) 
        //     }
        // );

        /** 2)
         * -- $match
         * toArray()
         * For all aggregate funtion, use toArray to send back result in response and view the response
         */

        // Collection.aggregate([
        //     { $match: { "continent": "North America" } }
        //     // it is like if("continent" == "North America")
        // ]).toArray(function (err, result) {
        //     if (err) throw err;
        //     return res.status(200).json({ msg: 'success', result }) // attach user session id to the response. It will be transfer in the cookies 
        // })

        // Collection.aggregate([
        //     { $match: { "continent": { $in: ["North America", "Asia"] } } }
        //     // It is like, if( "continent" == "North America" || "continent" == "Asia" )
        // ]).toArray(function (err, val) {
        //     if (err) throw err;
        //     return res.status(200).json({ result: val })
        // })

        /** 3)
         * $sort in find() and aggregation().
         * sort -1 means decending order, 1 means ascending order.
         */

        // Collection.find().sort({ "population": -1 }).toArray(function (err, val) {
        //     if (err) throw err;
        //     return res.status(200).json({ result: val })
        // })

        // Collection.aggregate([
        //     { $match: { "country": { $in: ["India", "Japan"] } } },
        //     { $sort: { "population": -1 } }
        // ]).toArray(function (err, val) {
        //     if (err) throw err;
        //     return res.status(200).json({ res: val })
        // })

        /** 4)
         * -- $group
         * It takes in multiple documents and arranges them into several separate batches based on grouping expression values and outputs a single document for each distinct batch.
         * The output documents hold information about the group and can contain additional computed fields like sums or averages across the list of documents from the group.
         */

        // Collection.aggregate([
        //     {
        //         $group: {
        //             "_id": { "Country_name": "$country" },
        //             "repeatedCountries": { $sum: 1 },
        //             "hightest_popullation_in_a_country": { $max: "$population" },
        //             "lowest_popullation_in_a_country": { $min: "$population" }
        //         }
        //     },
        //     { $match: { "hightest_popullation_in_a_country": { $gt: 20.0 } } },
        //     // { $sort: { "hightest_popullation_in_a_country": -1 } }
        // ]).toArray(function (err, val) {
        //     if (err) throw err;
        //     return res.status(200).json({ result: val })
        // })

        /** 5)
         * -- $project 
         * $project stage to construct new document structures in an aggregation pipeline, 
         * thereby altering the way resulting documents appear in the result set.
         * 
        // Write aggregation query to list
        // 1) country name, continant name (only India and China ) .
        // 2) Hightest population in a country(name and count).
        // 3) lowest population in a country(name and count). 
        
        */

        Collection.aggregate([
            { $match: { "country": { $in: ["India", "China"] } } },
            { $sort: { "population": -1 } },
            {
                $group: {
                    "_id": {
                        "country": "$country",
                        "continect": "$continent",
                    },
                    "highPopulationCount": { $first: "$population" },
                    "highPopulationName": { $first: "$name" },
                    "lowPopulationCount": { $last: "$population" },
                    "lowPopulationname": { $last: "$name" }
                }
            },
            {
                $project: {
                    "_id": 0,
                    "location_details": {
                        "country": "$_id.country",
                        "continant": "$_id.continect"
                    },
                    "high_population": {
                        "population": "$highPopulationCount",
                        "name": "$highPopulationName"
                    },
                    "low_population": {
                        "population": "$lowPopulationCount",
                        "name": "$lowPopulationname"
                    },
                }
            }
        ]).toArray(function (err, val) {
            if (err) throw err;
            return res.status(200).json({ result: val })
        })

        /** 6) Combine all stages
         * 
         */

        // Collection.aggregate([
        //     {
        //         $match: {
        //             "continent": { $in: ["North America", "Asia"] }
        //         }
        //     },
        //     {
        //         $sort: { "population": -1 }
        //     },
        //     {
        //         $group: {
        //             "_id": {
        //                 "country": "$country",
        //                 "continent": "$continent"
        //             },
        //             "first_city": { $first: "$name" },
        //             "hightestpopulation": { $max: "$population" },
        //         }
        //     },
        //     { $match: { "hightestpopulation": { $gt: 20.0 } } },
        //     { $sort: { "hightestpopulation": -1 } },
        //     {
        //         $project: {
        //             "_id": 0,
        //             "country_details": {
        //                 "country": "$_id.country",
        //                 "continent": "$_id.continent"
        //             },
        //             "highest_population": "$hightestpopulation"
        //         }
        //     }


        // ]).toArray(function (err, val) {
        //     if (err) throw err;
        //     return res.status(200).json({ result: val })
        // })

    });
})



module.exports = router