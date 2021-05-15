const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoose = require('mongoose');
const User = require('./Models/user');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('60510696baef662f28aeae2a').then((user) => {
    req.user = user;
    next();
  }).catch((err) => { console.log(err)});
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://rajeevmehta:Ilovemyasus2189@cluster0.7wo0n.mongodb.net/shop?retryWrites=true', { useUnifiedTopology: true }).then((result) => {
  User.findOne().then((user) => {
    if (!user) {
      const user = new User({ name: 'Rajeev', email: 'rajeev.mehta.me@gmail.com', cart: { items: []}});
      user.save();
    }
  })
  app.listen(3000);
  console.table('connected');
}).catch((error) => console.log(error));
