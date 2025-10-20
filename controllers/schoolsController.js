const db = require("../config/db")

// GET SCHOOLS LIST SORTED BY PROXIMITY
const getSortedSchools = async (req , res) => {
    try {
        const { latitude , longitude } = req.body ;
        if(!latitude || !longitude) {
            return res.status(400).send({
                success: false ,
                message: 'Please provide latitude and longitude'
            })
        }
        if(latitude < -90 || latitude > 90) {
            return res.status(400).send({
                success: false ,
                message: "Latitude coordinates must be between -90 to 90 range"
            })
        }
        if(longitude < -180 || longitude > 180) {
            return res.status(400).send({
                success: false ,
                message: "Longitude coordinates must be between -180 to 180 range"
            })
        }

        const [schoolsList] = await db.query (
            `SELECT id , name , address , latitude , longitude , 
            (6371 * ACOS(
                COS(RADIANS(?)) * COS(RADIANS(latitude)) *
                COS(RADIANS(longitude) - RADIANS(?)) +
                SIN(RADIANS(?)) * SIN(RADIANS(latitude))
            )) AS distance_km 
            FROM schools 
            ORDER BY distance_km ASC` , 
            [latitude , longitude , latitude] 
        ) ;

        res.status(200).send({
            success: true,
            message: 'Successfully sorted schools by proximity' ,
            data: schoolsList
        })
    } catch (error) {
        res.status(400).send({
            success: false ,
            message: 'Error in listSchools API' ,
            error
        })
    }
}

// GET ALL Schools list
const getSchools = async (req , res) => {
    try {
        const data = await db.query(' SELECT * FROM schools')
        if(!data) {
            return res.status(404).send({
                success: false ,
                message: 'No Records Found'
            })
        }
        res.status(200).send({
            success: true ,
            message: "All schools Records" ,
            totalSchools: data[0].length ,
            data: data[0] ,
        }) ;
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false ,
            message: 'Error in get all schools API' ,
            error
        })
    }
} ;

// GET SCHOOL BY ID

const getSchoolById = async (req , res) => {
    try {
        const schoolId = req.params.id 
        if(!schoolId) {
            return res.status(404).send({
                success: false ,
                message: 'Invalid Or Provide school id'
            })
        }
        const data = await db.query(`SELECT * FROM schools WHERE id=?`, [schoolId])
        if(!data) {
            return res.status(404).send({
                success:false ,
                message: 'no Records found' ,
            }) ;
        }
        res.status(200).send({
            success: true,
            schoolDetails : data[0],
        })
    } catch (error) {
        console.log(error) 
        res.status(500).send({
            success: false ,
            message: 'Error in get school by id api' ,
            error
        })

    }
}

// add school 
const addSchool = async (req , res) => {
    console.log('addSchool called', req.body);
    try {
        // VALIDATIONS 
        const {name , address , latitude , longitude} = req.body 
        if(!name || !address || !latitude || !longitude) {
            return res.status(500).send({
                success: false ,
                message: 'Please Provide all fields'
            })
        }
        if(name.length > 450 || address.length > 450) {
            return res.status(400).send({
                success: false ,
                message: "Name and address exceeds 450 character length"
            })
        }
        if(isNaN(latitude) || isNaN(longitude)) {
            return res.status(400).send({
                success: false ,
                message: "Latitude and longitude must be a Number"
            })
        }
        if(latitude < -90 || latitude > 90) {
            return res.status(400).send({
                success: false ,
                message: "Latitude coordinates must be between -90 to 90 range"
            })
        }
        if(longitude < -180 || longitude > 180) {
            return res.status(400).send({
                success: false ,
                message: "Longitude coordinates must be between -180 to 180 range"
            })
        }

        const [rows] = await db.query('SELECT * FROM schools WHERE name = ?' , [name]) ;
        if(rows.length > 0) {
            return res.status(400).send({
                success: false ,
                message: "School already exists in Database"
            }) ;
        }
        const data = await db.query('INSERT INTO schools (name , address , latitude , longitude) VALUES (? , ? , ? , ?)' , [name , address , latitude , longitude ])
        if(!data) {
            return res.status(404).send({
                success: false ,
                message : 'Error in add Query'
            })
        }
        res.status(201).send({
            success: true ,
            message: "New School Recod Added in Database" ,
        })
    } catch(error) {
        console.log(error)
        res.status(500).send({
            success: false ,
            message: 'Error in add school api' ,
            error
        })
    }

}

module.exports = { getSchools , getSchoolById , addSchool , getSortedSchools} ;