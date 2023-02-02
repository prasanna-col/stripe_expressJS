// Write aggregation query to list
// 1) country name, continant name (only India and China ) .
// 2) Hightest population in a country(name and count).
// 3) lowest population in a country(name and count).


// sample input
const collection = [
    {
        "name": "Delhi",
        "country": "India",
        "continent": "Asia",
        "population": 28.514
    },
    {
        "name": "Rio de Janeiro",
        "country": "Brazil",
        "continent": "South America",
        "population": 13.293
    },
    {
        "name": "Kolkata",
        "country": "India",
        "continent": "Asia",
        "population": 14.681
    },
    {
        "name": "São Paulo",
        "country": "Brazil",
        "continent": "South America",
        "population": 21.650
    },
    {
        "name": "Chongqing",
        "country": "China",
        "continent": "Asia",
        "population": 14.838
    },
    {
        "name": "Beijing",
        "country": "China",
        "continent": "Asia",
        "population": 19.618
    },
    {
        "name": "Shanghai",
        "country": "China",
        "continent": "Asia",
        "population": 25.582
    },
    {
        "name": "Mumbai",
        "country": "India",
        "continent": "Asia",
        "population": 19.980
    }
]


// sample output
/**
    [
        {
            "location_details": {
                "country": "India",
                "continant": "Asia"
            },
            "high_population": {
                "population": 28.514,
                "name": "Delhi"
            },
            "low_population": {
                "population": 14.681,
                "name": "Kolkata"
            }
        },
        {
            "location_details": {
                "country": "China",
                "continant": "Asia"
            },
            "high_population": {
                "population": 25.582,
                "name": "Shanghai"
            },
            "low_population": {
                "population": 14.838,
                "name": "Chongqing"
            }
        }
    ]
 */