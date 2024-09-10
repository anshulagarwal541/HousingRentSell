require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const Team = require('./models/team.js');
const House = require('./models/house.js');
const Application = require('./models/Application.js');
const cors = require('cors');
const { sign, verify } = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const User = require('./models/User.js');
const Chat = require('./models/Chat.js');
const Review = require('./models/Review.js')
const Query = require('./models/Queries.js');
const multer = require('multer');
const { storage, cloudinary } = require('./Cloudinary/index.js');
const upload = multer({ storage })
const oldUrl = 'mongodb://127.0.0.1:27017/houseRentSell'
mongoose.connect(`${process.env.DB}`)
    .then(() => {
        console.log("Sucessfully connected to mongoose database...");
    })
    .catch((e) => {
        console.log("Failed to connect to database....");
    })

app.use(cors());
app.use(express.json());

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
}

const validateUser = async (req, res, next) => {
    const accessToken = req.header('accessToken');
    if (!accessToken) {
        return res.json({ error: "User must be logged in !!" });
    }
    try {
        const validToken = verify(accessToken, process.env.SECRET_KEY);
        if (validToken) {
            req.user = validToken;
            next();
        }
    }
    catch (e) {
        return res.json({ error: "You have not yet signed up for this..!!" })
    }
}

const validateTeam = async (req, res, next) => {
    const accessMemberToken = req.header('accessMemberToken');
    if (!accessMemberToken) {
        return res.json({ error: "Member must be logged in !!" });
    }
    try {
        const validToken = verify(accessMemberToken, process.env.SECRET_KEY);
        if (validToken) {
            req.member = validToken;
            next();
        }
    }
    catch (e) {
        return res.json({ error: "You have not yet signed up for this..!!" })
    }
}

app.get('/', (req, res) => {
    res.send("welcome...");
})

app.get('/properties', async (req, res) => {
    try {
        const allProperties = await House.find();
        allCompanyProperties = allProperties.filter((property) => (property.sellerType === "company" && property.companySellStatus === "pending"))
        res.json(allCompanyProperties);
    } catch (e) {
        res.json({ error: "No properties found in the database.." });
    }
})

app.post('/propertyCategory', async (req, res) => {
    try {
        const data = req.body;
        const allProperties = await House.find();
        if (!allProperties) {
            return res.json({ error: "Company is not selling any property right now.." })
        }
        allCompanyProperties = allProperties.filter((property) => (property.sellerType === "company" && property.companySellStatus === "pending"))
        const filteredProp = allCompanyProperties.filter((house) => house.category === data.category);
        res.json(filteredProp);
    }
    catch (e) {
        res.json({ error: e.message });
    }
})

app.post('/properties', async (req, res) => {
    try {
        const filters = req.body;
        let allProperties = await House.find({ sellerType: "company", companySellStatus: "pending" })
        if (filters.rooms) {
            const filtered = allProperties.filter((p) => parseInt(p.rooms) == parseInt(filters.rooms));
            allProperties = filtered;
        }
        if (filters.minPrice) {
            const filtered = allProperties.filter((p) => parseInt(p.totalPrice) >= parseInt(filters.minPrice));
            allProperties = filtered;
        }
        if (filters.maxPrice) {
            const filtered = allProperties.filter((p) => parseInt(p.totalPrice) <= parseInt(filters.maxPrice));
            allProperties = filtered;
        }
        if (filters.category) {
            const filtered = allProperties.filter((p) => p.category === filters.category);
            allProperties = filtered;
        }
        if (filters.country) {
            const filtered = allProperties.filter((p) => p.address.toLowerCase().includes(filters.country.toLowerCase()));
            allProperties = filtered;
        }
        if (filters.city) {
            const filtered = allProperties.filter((p) => p.address.toLowerCase().includes(filters.city.toLowerCase()));
            allProperties = filtered;
        }
        if (allProperties.length == 0) {
            return res.json({ error: "No properties found in the database.." })
        }
        res.json(allProperties);
    } catch (e) {
        // "No properties found in the database.."
        res.json({ error: e.message });
    }
})

app.get('/teams', async (req, res) => {
    try {
        const allTeams = await Team.find().populate({
            path: 'assignedHouses'
        }).populate({
            path: 'reviews',
            populate: {
                path: 'user'
            }
        }).populate({
            path: 'chats',
            populate: {
                path: 'to'
            }
        });
        res.json(allTeams);
    }
    catch (e) {
        res.json({ error: "Sorry no members found in database.." });
    }
})

app.get('/properties/:id', async (req, res) => {
    const { id } = req.params;
    const property = await House.findById(id).populate({
        path: 'agent'
    }).populate({
        path: 'controller'
    }).populate({
        path: "seller"
    });
    if (property) {
        //companyProperty = property.filter((property) => (property.sellerType === "company" && property.sellStatus === "pending"))
        res.json(property);
    }
    else {
        res.json({ error: "Sorry can't find the property with the selected id..." })
    }
})

app.get('/property/:id/images', async (req, res) => {
    const { id } = req.params;
    const property = await House.findById(id);
    if (property) {
        //companyProperty = property.filter((property) => (property.sellerType === "company" && property.sellStatus === "pending"))
        const propertyImages = property.images;
        if (propertyImages) {
            res.json(propertyImages);
        }
        else {
            res.json({ error: "No property images..!!!" });
        }
    }
    else {
        res.json({ error: "No property !!" });
    }
})

app.post('/signup', async (req, res) => {
    try {
        const usernameLoggedIn = await User.findOne({ username: req.body.username });
        const emailLoggedIn = await User.findOne({ email: req.body.email });
        if (usernameLoggedIn) {
            return res.json({ error: "Username already registered !!" })
        }
        else if (emailLoggedIn) {
            return res.json({ error: "Email already registered !!" })
        }
        else {
            const newUser = new User({
                username: req.body.username,
                phone: parseInt(req.body.phone),
                email: req.body.email
            });
            newUser.password = await bcrypt.hash(req.body.password, 10);
            await newUser.save();
            const accessToken = sign({
                username: newUser.username,
                _id: newUser._id
            }, process.env.SECRET_KEY);
            res.json(accessToken);
        }
    }
    catch (e) {
        res.json({ error: e.message });
    }
})

app.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.json({ error: "You must create an account first !!" })
        }
        const result = await bcrypt.compare(req.body.password, user.password);
        if (result) {
            const accessToken = sign({ username: req.body.username, _id: user._id }, process.env.SECRET_KEY);
            res.json(accessToken);
        }
        else {
            res.json({ error: "The username or password is incorrect..!!" });
        }
    }
    catch (e) {
        res.json({ error: e.message })
    }
})

app.post('/memberLogin', async (req, res) => {
    if (isNaN(req.body.pin)) {
        return res.json({ error: "The member-id or pin is incorrect..!!" })
    }
    const teamMember = await Team.findOne({ memberId: req.body.memberId, pin: req.body.pin });
    if (teamMember) {
        const accessMemberToken = sign({ memberId: req.body.memberId, _id: teamMember._id }, process.env.SECRET_KEY);
        res.json(accessMemberToken);
    }
    else {
        res.json({ error: "The member-id or pin is incorrect..!!" });
    }
})

app.get('/team/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const teamMember = await Team.findById(id).populate({
            path: 'assignedHouses'
        }).populate({
            path: 'reviews',
            populate: {
                path: 'user'
            }
        });
        res.json(teamMember);
    }
    catch (e) {
        res.json({ error: e.message });
    }
})

app.post('/upload', upload.array('file', 10), async (req, res) => {
    try {
        const files = req.files;
        const urls = [];

        for (const file of files) {
            const result = await cloudinary.uploader.upload(file.path); // Upload file to Cloudinary
            urls.push(result.secure_url); // Push the URL of the uploaded file to the array
        }
        res.json({ urls });
    }
    catch (e) {
        res.json({ error: e.message });
    }
})

app.post('/addProperties', validateTeam, async (req, res) => {
    try {
        const data = req.body;
        const controller = await Team.findOne({ memberId: "HRS12092002-1" });
        const agent = await Team.findOne({ memberId: data.agentId });
        let newProperty = new House({
            address: data.address,
            bath: data.bath,
            rooms: data.rooms,
            area: data.area,
            totalPrice: data.totalPrice,
            emiPrice: data.emiPrice,
            category: data.category
        });

        newProperty.images = data.urls;
        const response = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${data.address}&apiKey=3b2d887ed6174074818fb94898b584f7`, { method: 'GET' });
        const result = await response.json();
        if (result.features && result.features.length > 0) {
            newProperty.latitude = result.features[0].geometry.coordinates[1]; // Note: latitude is the second coordinate
            newProperty.longitude = result.features[0].geometry.coordinates[0];
        } else {
            newProperty.latitude = 0.0;
            newProperty.longitude = 4.5;
        }
        newProperty.controller = controller;
        newProperty.agent = agent;
        await newProperty.save();
        if (agent.assignedHouses.length === 0) {
            agent.assignedHouses = newProperty;
        }
        else {
            agent.assignedHouses.push(newProperty);
        }
        controller.assignedHouses.push(newProperty);
        await controller.save();
        await newProperty.save();
        await agent.save();
        res.json("submitted Successfully");
    }
    catch (e) {
        res.json({ error: e.message });
    }
})

app.post('/userSellProperty', validateUser, async (req, res) => {
    try {
        const data = req.body;
        const currentUser = await User.findById(req.user._id);
        let newHouse = new House({
            address: data.address,
            rooms: data.rooms,
            bath: data.bath,
            area: data.area,
            totalPrice: data.totalPrice,
            emiPrice: data.emiPrice,
            price: data.totalPrice,
            category: data.category,
            images: data.urls,
            sellerType: "user",
            seller: currentUser,
            userSellStatus: "pending"
        })
        const response = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${data.address}&apiKey=3b2d887ed6174074818fb94898b584f7`, { method: 'GET' });
        const result = await response.json();
        if (result.features && result.features.length > 0) {
            newHouse.latitude = result.features[0].geometry.coordinates[1]; // Note: latitude is the second coordinate
            newHouse.longitude = result.features[0].geometry.coordinates[0];
        } else {
            newHouse.latitude = 0.0;
            newHouse.longitude = 4.5;
        }
        await newHouse.save();
        if (currentUser.ownedHouses.length == 0) {
            currentUser.ownedHouses = newHouse;
        }
        else {
            currentUser.ownedHouses.push(newHouse);
        }
        await currentUser.save();
        res.json("submitted Successfully");
    }
    catch (e) {
        res.json({ error: e.message })
    }
})

app.post('/removeUserHouse', validateTeam, async (req, res) => {
    try {
        const userHouse = await House.findById(req.body.houseId).populate({
            path: 'seller',
            populate: {
                path: 'ownedHouses'
            }
        });
        userHouse.userSellStatus = "rejected";
        const houses = userHouse.seller.ownedHouses;
        userHouse.seller.ownedHouses = houses.filter((house) => house._id.toString() !== req.body.houseId);
        await userHouse.save();
        res.json("You have successfully rejected the house..")
    }
    catch (e) {
        res.json({ error: e.message });
    }
})

app.post('/rejectCompanyRequest', validateUser, async (req, res) => {
    try {
        const userHouse = await House.findById(req.body.houseId).populate({
            path: 'seller',
            populate: {
                path: 'ownedHouses'
            }
        });
        userHouse.userSellStatus = "pending";
        userHouse.agent = null;
        await userHouse.save();
        const allUserHouses = await House.find({ sellerType: "user", userSellStatus: "pending" }).populate({
            path: "seller"
        });
        const allHouses = allUserHouses.filter((house) => house.seller._id === req.user._id);
        res.json(allHouses)
    }
    catch (e) {
        res.json({ error: e.message });
    }
})

app.post('/approveCompanyRequest', validateUser, async (req, res) => {
    try {
        const userHouse = await House.findById(req.body.houseId).populate({
            path: 'seller',
            populate: {
                path: 'ownedHouses'
            }
        }).populate({
            path: 'agent'
        });
        const assignedAgent = await Team.findById(userHouse.agent._id);
        const controller = await Team.findOne({ memberId: "HRS12092002-1" });
        userHouse.controller = controller;
        if (assignedAgent.assignedHouses.length === 0) {
            assignedAgent.assignedHouses = userHouse;
        }
        else {
            assignedAgent.assignedHouses.push(userHouse);
        }
        if (controller.assignedHouses.length === 0) {
            controller.assignedHouses = userHouse;
        }
        else {
            controller.assignedHouses.push(userHouse);
        }
        userHouse.userSellStatus = "sold";
        userHouse.sellerType = "company";
        const seller = await User.findById(userHouse.seller._id);
        const houses = seller.ownedHouses;
        seller.ownedHouses = houses.filter((house) => house._id.toString() !== req.body.houseId);
        await assignedAgent.save();
        await controller.save();
        await seller.save();
        await userHouse.save();
        const allUserProperties = await House.find({ sellerType: "user", userSellStatus: "pending" }).populate({
            path: "seller"
        })
        const properties = allUserProperties.filter((property) => property.seller._id === req.user._id);
        res.json(properties);
    }
    catch (e) {
        res.json({ error: e.message });
    }
})

app.post('/setHouseWaiting', validateTeam, async (req, res) => {
    const house = await House.findById(req.body.houseId);
    if (house) {
        house.userSellStatus = "waiting";
        const agent = await Team.findOne({ memberId: req.body.agentId });
        house.agent = agent;
        await house.save();
        res.json("Request generated. Please wait for the owner's approval.")
    }
    else {
        res.json({ error: "Opps something invalid occured..." })
    }
})

app.post('/getHouses', async (req, res) => {
    try {
        const data = req.body;
        const allUserProperties = await House.find({ userSellStatus: data.status }).populate({
            path: "seller"
        });
        res.json(allUserProperties);
    }
    catch (e) {
        res.json({ error: e.message });
    }
})

app.post('/sellProperty', validateTeam, async (req, res) => {
    try {
        const data = req.body;
        const property = await House.findById(data.propertyId).populate({
            path: "controller"
        }).populate({
            path: "agent"
        });
        const user = await User.findById(data.owner);
        property.companySellStatus = "sold";
        property.owner = user;
        const controller = await Team.findById(property.controller._id).populate({
            path: "assignedHouses"
        });
        const agent = await Team.findById(property.agent._id).populate({
            path: "assignedHouses"
        });
        controller.assignedHouses = controller.assignedHouses.filter((p) => p._id !== property._id);
        allP = agent.assignedHouses.filter((p) => p._id !== property._id)
        agent.assignedHouses = allP;
        if (user.ownedHouses.length == 0) {
            user.ownedHouses = property;
        }
        else {
            user.ownedHouses.push(property);
        }
        await user.save();
        await property.save();
        await controller.save();
        await agent.save();
        res.json("Property sold Successfullu...")
    }
    catch (e) {
        res.json({ error: e.message });
    }
})

app.post('/deleteProperty', validateTeam, async (req, res) => {
    try {
        const data = req.body;
        const house = await House.findById(data.propertyId).populate({
            path: "agent"
        }).populate({
            path: "controller"
        }).populate({
            path: "applications"
        })
        const agent = await Team.findById(data.agentId).populate({
            path: "assignedHouses"
        });
        const controller = await Team.findOne({ memberId: "HRS12092002-1" }).populate({
            path: "assignedHouses"
        });
        const agentHouses = agent.assignedHouses.filter((h) => h._id.toString() !== house._id);
        agent.assignedHouses = agentHouses;
        const controllerHouses = controller.assignedHouses.filter((h) => h._id.toString() !== house._id);
        controller.assignedHouses = controllerHouses;
        house.seller = null;
        house.controller = null;
        house.agent = null;
        if (house.applications.length > 0) {
            for (const appli of house.applications) {
                const houseApplication = await Application.findByIdAndDelete(appli._id);
            }
            house.applications = [];
        }
        await house.save();
        await agent.save();
        await controller.save();
        const deletedHouse = await House.findByIdAndDelete(house._id);
        res.json("Property removed from database successfully...!!");
    }
    catch (e) {
        res.json({ error: e.message });
    }
})

app.post('/getUserHouses', validateUser, async (req, res) => {
    try {
        const data = req.body;
        if (data.status == "bought") {
            const allUserProperties = await House.find({ companySellStatus: "sold" }).populate({
                path: "seller"
            }).populate({
                path: "owner"
            }).populate({
                path: "agent"
            });
            const userProperties = allUserProperties.filter((property) => property.owner._id.toString() === req.user._id);
            res.json(userProperties);
        }
        else {
            const allUserProperties = await House.find({ userSellStatus: data.status }).populate({
                path: "seller"
            });
            const userProperties = allUserProperties.filter((property) => property.seller._id.toString() === req.user._id);
            res.json(userProperties);
        }
    }
    catch (e) {
        res.json({ error: e.message });
    }
})

app.get('/getUser', validateUser, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate({
            path: 'queries',
            populate: [
                { path: 'query' },
                { path: 'from' },
                { path: 'status' },
                { path: 'reply' }
            ]
        });
        res.json(user);
    }
    catch (e) {
        res.json({ error: e.message });
    }
})

app.get('/getTeam', validateTeam, async (req, res) => {
    try {
        const team = await Team.findById(req.member._id);
        res.json(team);
    }
    catch (e) {
        res.json({ error: e.message });
    }
})

app.get('/getMember', validateTeam, async (req, res) => {
    try {
        const teamMember = await Team.findById(req.member._id).populate({
            path: 'assignedHouses'
        }).populate({
            path: 'reviews',
            populate: {
                path: 'user'
            }
        }).populate({
            path: 'chats',
            populate: {
                path: 'to'
            }
        }).populate({
            path: 'chats',
            populate: {
                path: 'from'
            }
        });
        const uniqueChats = [];
        const uniqueChatUsers = new Set();

        teamMember.chats.forEach(chat => {
            const fromUserId = chat.from._id.toString();
            const toUserId = chat.to._id.toString();

            if (!uniqueChatUsers.has(fromUserId)) {
                uniqueChatUsers.add(fromUserId);
                uniqueChats.push(chat);
            }

            if (!uniqueChatUsers.has(toUserId)) {
                uniqueChatUsers.add(toUserId);
                uniqueChats.push(chat);
            }
        });
        res.json({
            ...teamMember.toObject(),
            chats: uniqueChats
        });
    }
    catch (e) {
        res.json({ error: e.message })
    }
})

app.post('/fetchMessages', validateTeam, async (req, res) => {
    const allMessages = await Chat.find().populate({
        path: 'from'
    }).populate({
        path: 'to'
    });
    // const allMessage1 = allMessages.filter((message) => ((message.from._id === req.body.user2._id && message.to._id === req.body.user1._id) || (message.to._id === req.body.user2._id && message.from._id === req.body.user1._id)));
    const allMessage1 = allMessages.filter((message) => (
        (message.from._id.toString() == req.body.user2 && message.to._id.toString() == req.body.user1) || (message.to._id.toString() == req.body.user2 && message.from._id.toString() == req.body.user1)));
    res.json(allMessage1);
})

app.get('/getMember/:id', async (req, res) => {
    const { id } = req.params;
    const member = await Team.findById(id);
    res.json(member);
})

app.post('/queries', validateUser, async (req, res) => {
    try {
        const data = req.body;
        const newQuery = new Query({
            query: data.query
        })
        const user = await User.findById(data.from);
        newQuery.from = user._id;
        await newQuery.save();
        user.queries.push(newQuery._id);
        await user.save();
        res.json("done");
    }
    catch (e) {
        res.json({ error: e.message });
    }
})

app.post('/submitApplication', validateUser, async (req, res) => {
    try {
        const data = req.body;
        const hasApplied = await Application.findOne({ user: req.user._id, property: data.propertyId });
        if (hasApplied) {
            return res.json({ error: "You have already applied for this property. Either wait for a call or directly contact the agent..!!" })
        }
        const newApplication = new Application({
            name: data.name,
            email: data.email,
            phone: data.phone,
            date: data.date,
            message: data.message,
            property: data.propertyId,
            agent: data.agent,
            controller: data.controller,
            user: req.user._id
        });
        await newApplication.save();
        const member = await Team.findById(data.agent);
        const controller = await Team.findById(data.controller);
        const house = await House.findById(data.propertyId);
        if (member.applications.length == 0) {
            member.applications = newApplication._id;
        }
        else {
            member.applications.push(newApplication._id);
        }
        if (controller.applications.length == 0) {
            controller.applications = newApplication._id;
        }
        else {
            controller.applications.push(newApplication._id);
        }
        if (house.applications.length == 0) {
            house.applications = newApplication._id;
        }
        else {
            house.applications.push(newApplication._id);
        }
        const user = await User.findById(req.user._id);
        if (user.applications.length == 0) {
            user.applications = newApplication._id;
        }
        else {
            user.applications.push(newApplication._id);
        }
        await member.save();
        await controller.save();
        await house.save();
        await user.save();
        res.json("done");
    }
    catch (e) {
        res.json({ error: e.message });
    }
})

app.post('/getAppliedUsers', validateTeam, async (req, res) => {
    try {
        const data = req.body;
        const property = await House.findById(data.houseId).populate({
            path: "applications",
            populate: [
                { path: "user" }
            ]
        })
        const users = [];
        property.applications.forEach((house) => {
            users.push(house.user);
        })
        res.json(users);
    }
    catch (e) {
        res.json({ error: e.message });
    }
})

app.post('/getApplications', validateTeam, async (req, res) => {
    try {
        const data = req.body;
        const employee = await Team.findById(req.member._id).populate({
            path: 'applications',
            populate: [
                { path: "agent" },
                { path: 'property' },
                { path: "controller" },
                { path: 'user' }
            ]
        })
        const allApplications = employee.applications.filter((application) => application.status === data.status)
        res.json(allApplications);
    }
    catch (e) {
        res.json({ error: e.message })
    }
})

app.post('/updateApplication', validateTeam, async (req, res) => {
    try {
        const data = req.body;
        const currApplication = await Application.findById(data._id);
        currApplication.status = "contacted";
        await currApplication.save();
        const employee = await Team.findById(req.member._id).populate({
            path: 'applications',
            populate: [
                { path: "agent" },
                { path: 'property' },
                { path: "controller" },
                { path: 'user' }
            ]
        })
        const allApplications = employee.applications.filter((application) => application.status === "pending")
        res.json(allApplications);
    }
    catch (e) {
        res.json({ error: e.message })
    }
})

app.post('/findProperty', async (req, res) => {
    try {
        const data = req.body;
        const allProperties = await House.find();
        const properties = allProperties.filter((property) => (property.sellerType === "company" && property.companySellStatus === "pending"))
        const found = [];
        properties.forEach((property) => {
            if (data.city && property.address.toLowerCase().includes(data.city.toLowerCase())) {
                found.push(property);
            }
            else if (data.category && property.category === data.category) {
                found.push(property)
            }
            else if (data.price && property.price <= data.price) {
                found.push(property);
            }
        })
        res.json(found);
    }
    catch (e) {
        res.json({ error: e.message });
    }
})

app.post('/getQueriesTeam', validateTeam, async (req, res) => {
    try {
        const data = req.body;
        const allQueries = await Query.find({ status: data.status }).populate({
            path: 'from'
        });
        res.json(allQueries)
    }
    catch (e) {
        res.json({ error: e.message })
    }
})

app.post('/getQueriesUser', validateUser, async (req, res) => {
    try {
        const data = req.body;
        const allQueries = await Query.find({ status: data.status }).populate({
            path: 'from'
        });
        res.json(allQueries)
    }
    catch (e) {
        res.json({ error: e.message })
    }
})

app.post('/queryReply', validateTeam, async (req, res) => {
    try {
        const data = req.body;
        const query = await Query.findById(data.queryId);
        query.reply = data.reply;
        query.status = "resolved";
        await query.save();
        const allQuery = await Query.find({ status: "pending" }).populate({
            path: 'from'
        })
        res.json(allQuery)
    }
    catch (e) {
        res.json({ error: e.message });
    }
})

app.post('/postMessages', validateTeam, async (req, res) => {
    const data = req.body;
    const newMessage = new Chat({ message: data.message });
    newMessage.from = data.from;
    newMessage.to = data.to;
    await newMessage.save();
    const toGuy = await Team.findById(data.to);
    const fromGuy = await Team.findById(data.from);
    toGuy.chats.push(newMessage);
    fromGuy.chats.push(newMessage);
    await toGuy.save();
    await fromGuy.save();
    const allMessages = await Chat.find().populate({
        path: "to"
    }).populate({
        path: "from"
    })
    const allMessage1 = allMessages.filter((message) => (
        (message.from._id.toString() == data.to && message.to._id.toString() == data.from) || (message.to._id.toString() == data.to && message.from._id.toString() == data.from)));
    res.json(allMessage1);

})

app.get('/allPeopleChats', validateTeam, async (req, res) => {
    try {
        const allTeams = await Team.find().populate({
            path: 'assignedHouses'
        }).populate({
            path: 'reviews',
            populate: {
                path: 'user'
            }
        }).populate({
            path: 'chats',
            populate: {
                path: 'to'
            }
        });
        const filteredTeams = allTeams.filter(team => {
            return team.memberId !== req.member.memberId;
        });
        res.json(filteredTeams);
    }
    catch (e) {
        res.json({ error: "Sorry no members found in database.." });
    }
})

app.post('/updateDetails', validateTeam, async (req, res) => {
    const data = req.body;
    try {
        const team = await Team.findById(data._id);
        team.name = data.name;
        team.email = data.email;
        team.phone = data.phone;
        await team.save();
        res.json("done");
    }
    catch (e) {
        res.json({ error: e.message });
    }
})

app.post('/review', validateUser, async (req, res) => {
    try {
        const data = req.body;
        const newReview = new Review({
            review: data.review,
            rating: data.rating
        });
        newReview.user = data.user;
        newReview.agent = data.agent;
        await newReview.save();
        const user = await User.findById(data.user);
        user.reviews.push(newReview);
        const agent = await Team.findById(data.agent).populate('reviews');
        const userHasReviewed = agent.reviews.some(review => review.user.toString() === data.user);
        if (!userHasReviewed) {
            agent.reviews.push(newReview);
            let sum = 0;
            agent.reviews.forEach((review) => { sum += review.rating })
            agent.totalRating = (sum) / agent.reviews.length;
            await agent.save();
            await user.save();
            res.json(agent);
        }
        else {
            res.json({ error: "User has already submitted the review" });
        }

    }
    catch (e) {
        res.json({ error: e.message });
    }
})




app.use((err, req, res, next) => {
    console.log("error")
    res.status(500).send("Error");
    next(err);
})


app.listen(port, (req, res) => {
    console.log(`Sucessfully connected to port : ${port}....`);
})