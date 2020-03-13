const initialState = {
  store: [
    {
      name: 'jack gusset bot',
      images: [ { url: 'https://wootten.com.au/content/uploads/2019/05/jack-boot-wc-acorn-raw-front.jpg', name: '1', type: 'image/jpg' },
      { src: 'https://wootten.com.au/content/uploads/2019/05/Jack-boot-wc-acorn-raw-rapid-side.jpg', name: '2', type: 'image/jpg' },
      { src: 'https://wootten.com.au/content/uploads/2019/05/jack-boot-wc-acorn-raw-pose.jpg', name: '3', type: 'image/jpg' },
      { src: 'https://wootten.com.au/content/uploads/2019/05/jack-boot-wc-acorn-brown-back.jpg', name: '4', type: 'image/jpg' }],
      details: `This lined Gusset boot is predominantly made using New Zealand bovine leather.
      This thick yet subtle leather makes for a durable and comfortable boot that will mould and age with the wearer.
      When using this leather we are able to construct it without the side seam.
      We refer to this as the wholecut Jack gusset boot as it is made out of one piece of leather.
      This lined Gusset boot is predominantly made using New Zealand bovine leather.
      This thick yet subtle leather makes for a durable and comfortable boot that will mould and age with the wearer.
      When using this leather we are able to construct it without the side seam.
      We refer to this as the wholecut Jack gusset boot as it is made out of one piece of leather.`,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['white', 'black', 'red'],
      costPerItem: 450,
      link: 'jack-gusset-bot'
    }
    // {
    //   name: 'gordon boot dress',
    //   images: [ { src: 'https://wootten.com.au/content/uploads/2017/03/Gordon-boot-gold-yearling-rapid-mild-com-side.jpg', name: '1' },
    //   { src: 'https://wootten.com.au/content/uploads/2017/03/Gordon-boot-gold-yearling-rapid-mild-com-angle.jpg', name: '2' },
    //   { src: 'https://wootten.com.au/content/uploads/2017/03/Gordon-boot-crazy-horse-rapid-dianite-raw-side.jpg', name: '3' },
    //   { src: 'https://wootten.com.au/content/uploads/2017/03/gordon-yearling-etan-cap-rapid-brown-angle.jpg', name: '4' }],
    //   details: `This fully lined Derby boot is made using calf, yearling, kangaroo or bovine leather.
    //   It can also be made on our dress shoe lasts, the Cambridge and Stanley to give a more refined look.
    //   This lined Gusset boot is predominantly made using New Zealand bovine leather.
    //   This thick yet subtle leather makes for a durable and comfortable boot that will mould and age with the wearer.
    //   When using this leather we are able to construct it without the side seam.
    //   We refer to this as the wholecut Jack gusset boot as it is made out of one piece of leather.`,
    //   sizes: ['S', 'M', 'L', 'XL'],
    //   colors: ['white', 'black', 'red'],
    //   costPerItem: 500,
    //   link: 'gordon-boot-dress'
    // }, {
    //   name: 'saddle oxford',
    //   images: [ { src: 'https://wootten.com.au/content/uploads/2013/02/saddle-oxford-natural-roo-pose.jpg', name: '1' },
    //   { src: 'https://wootten.com.au/content/uploads/2013/02/saddle-oxford-natural-roo-angle.jpg', name: '2' },
    //   { src: 'https://wootten.com.au/content/uploads/2013/02/saddle-oxford-yearling-suntan-pose.jpg', name: '3' },
    //   { src: 'https://wootten.com.au/content/uploads/2013/02/saddle-oxford-yearling-suntan-back.jpg', name: '4' }],
    //   details: `PLEASE NOTE that the hand-dyed navy is more vibrant and darker than the sample shown when the shoe is first made,
    //   however with time this will fade back to the example shown.
    //   This lined Gusset boot is predominantly made using New Zealand bovine leather.
    //   This thick yet subtle leather makes for a durable and comfortable boot that will mould and age with the wearer.
    //   When using this leather we are able to construct it without the side seam.
    //   We refer to this as the wholecut Jack gusset boot as it is made out of one piece of leather.`,
    //   sizes: ['S', 'M', 'L', 'XL'],
    //   colors: ['white', 'black', 'red'],
    //   costPerItem: 350,
    //   link: 'saddle-oxford'
    // }
  ]
};
export default initialState;

export const getStoreItem = (link) => initialState.store.find(product => product.link === link);