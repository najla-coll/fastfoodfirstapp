const bcrypt = require('bcryptjs')
const data = {
   users:[
      {
        firstName:'najla',
        lastName:'yousfi',
        email:'najla@gmail.com',
        
        password:bcrypt.hashSync('Najla#1234', 10),
       
        isAdmin:true
      },
      {
         firstName:'user',
         lastName:'users',
         email:'user@gmail.com',
        
         password:bcrypt.hashSync('User#1234', 10),
        
         isAdmin:false
       }
   ],
    products:[
        {
           
            name:'Hawaiian Pizza',
            description:'The famous variation of pizza with the typical ingredient: pineapple',
            rating:4.5,
            prix:'11',
            image:'https://www.casa-pizza.com/images/photorecettes/pizza-hawaienne-123rf.jpg',
            
         },
         {
            
            name:'Pizza',
            description:'The oldest pizza, whose simplicity makes it the benchmark',
            rating:4.0,
            prix:'5',
            image:'https://www.casa-pizza.com/images/pizzas-salees-pb.jpg',
            
         },
         {
            
            name:'Hamburger',
            description:'Tasty and appetizing hamburger cheeseburger',
            rating:3.0,
            prix:'15',
            image:'https://www.dabaolajamais.ma/wp-content/uploads/2020/09/hamberger-300x300.jpg',
            
         },
         {
            
            name:'Makloub schnitzel',
            description:'Tunisian makloub, stuffed with tuna, chicken or even merguez',
            rating:5.0,
            prix:'4',
            image:'http://www.boneexpress.co/uploads/restorants/321d4fa9-de3f-4b75-a789-a29d2a39a11e_large.jpg',
            
         },
         {
            
            name:'Lebanese',
            description:'Lebanese minced meat',
            rating:2.5,
            prix:'3',
            image:'http://www.boneexpress.co/uploads/restorants/dc0e642f-47ae-4732-8c82-cf6374a9c770_large.jpg',
            
         },
         {
            
            name:'Stuffed Baguette',
            description:'Baguette Stuffed minced meat 2XL',
            rating:2.5,
            prix:'7',
            image:'http://www.boneexpress.co/uploads/restorants/b02006fd-3d15-4096-a0d8-acf6f6015ec6_large.jpg',
           
         },
         {
            
            name:'escalope dish',
            description:'plat escalope salade, omelette',
            rating:2.5,
            prix:'6',
            image:'http://www.boneexpress.co/uploads/restorants/af397dee-45e6-4675-a7b8-1d8ddb8bf8ec_large.jpg',
            
         },
         {
            
            name:'Mixed dish',
            description:'mixed dish salad, omelet',
            rating:2.5,
            prix:'6',
            image:'http://www.boneexpress.co/uploads/restorants/a25675db-3384-4045-81f3-dc4b380210ad_large.jpg',
           
         }
       
    ]
}
module.exports=data