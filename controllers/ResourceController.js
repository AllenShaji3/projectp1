// INSTRUCTIONS:
/*
  Create a new resource controller that uses the
  User as an associative collection (examples):
  - User -> Books
  - User -> Reservation

  The resource controller must contain the 7 resource actions:
  - index
  - show
  - new
  - create
  - edit
  - update
  - delete
*/
const viewPath = 'resources';
const Resource = require('../models/Resource');
const User = require('../models/User');
const resources = require('../routes/resources');


exports.index = async (req, res) => {
  try {
    const diary = await Resource
    .find()
    .populate('user')
    .sort({updatedAt: 'desc'});

    res.status(200).json(resources);
  }catch(error) {
    res.status(400).json({message: 'There was an error fetching the Resouces', error});
  }
};

exports.new = (req, res) => {
  res.render(`${viewPath}/new`, {
    pageTitle: 'New Diary'
  });
};

exports.create =  async (req, res) => {
  try {
    const { user: email } = req.session.passport;
    const user = await User.findOne({email: email});
    
    const diary = await Resource.create({user: user._id, ...req.body});

    req.flash('success', 'Diary created successfully');
    res.redirect(`/resources/${diary.id}`);
  } catch (error) {
    req.flash('danger', `There was an error creating this diary: ${error}`);
    req.session.formData = req.body;
    res.redirect('/resources/new');
  }

};

exports.show = async (req, res) => {
  try {
    const diary = await Resource.findById(req.params.id)
      .populate('user');
    res.render(`${viewPath}/show`, {
      pageTitle: diary.title,
      diary: diary
    });
  } catch (error) {
    req.flash('danger', `There was an error displaying this blog: ${error}`);
    res.redirect('/');
  }
};

exports.edit = async (req, res) => {

try {
const diary  = await Resource.findById(req.params.id);
res.render(`${viewPath}/edit`, {
  pageTitle: diary.title,
  formData: diary
});
}
catch(error){
req.flash('danger', `There was an error accessing this blog: ${error}`);
res.redirect('/');
}
};

exports.update = async (req, res) => {
try {
  const{user:email} = req.session.passport;
  const user = await User.findOne({email: email});

  let diary = await Resource.findById(req.body.id);
  if(!diary) throw new Error('Diary could not be found');
  const attributes = {user: user._id, ...req.body};
  await Resource.validate(attributes);
  await Resource.findByIdAndUpdate(attributes.id, attributes);
  req.flash('success', 'Diary updated successfullyy');
  res.redirect(`/resources/${req.body.id}`);

}
catch(error){
  req.flash('danger', `There was an error updating this blog: ${error}`);
  res.redirect(`/resources/${req.body.id}/edit`);
}
};

exports.delete = async (req, res) => {
try {
  await Resource.deleteOne({_id: req.body.id});
  req.flash('Successfully deleted your diary');
  res.redirect(`/resources`);

}catch(error) {
  req.flash(`There was an error deleting your diary: ${error}`);
  res.redirect(`/resources`);
}


}



