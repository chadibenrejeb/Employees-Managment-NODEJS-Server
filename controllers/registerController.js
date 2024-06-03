const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });


    // check for duplicate usernames in the db
    const duplicate = await User.findOne({username : user}).exec();

    if (duplicate) return res.sendStatus(409); //Conflict 
    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);// 10 : hiya salt rounds , unique l kol pwd bech hata ki yet hacka bd mte3ek w ytala3 mdp maynajamsh y crypti b9iyet les mdps
         //"salt round"? In cryptography, particularly when hashing passwords, "salt rounds" refer to the number of iterations or rounds of hashing performed to derive a secure hash. Increasing the number of salt rounds enhances the security of hashed passwords by making them more resistant to brute-force attacks.
        
        //create and store the new user
        const result = await User.create({
            "username": user,
            "password": hashedPwd
        });

        const newUser = new User();
        console.log(result);


        res.status(201).json({ 'success': `New user ${user} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };
