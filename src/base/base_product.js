import { database, storageRef } from './base';

const deleteProductImage = async image => {
  try {
    await storageRef.child(image.path).delete();
    return null;
  } catch (err) {
    alert(err);
    delete image.delete;
    return image;
  }
};

const onSaveImages = async (images, link) => {
  console.log(images);
  return await Promise.all(images.map(async (image) => {
    try {
      if (image.delete) return await deleteProductImage(image);

      if (image.path === '') {
        const imagePath = storageRef.child(`product/${link}/${image.name}`);

        const response = await fetch(image.url, { method: 'GET' });
        const reader = response.body.getReader();
        const { value } = await reader.read();
        const blob = new Blob([value], { type: image.type });
        await imagePath.put(blob);

        return {...image, path: `product/${link}/${image.name}` };   
      }

      return image;
    } catch (err) {
      alert(err);
    }
  }));
};

export const setItemProduct = async (product) => {
  try {
    const saveImages = await onSaveImages(product.images, product.link );
      console.log(saveImages);
      

    await database.ref(`/test/${product.link}`).set({ ...product, images: saveImages });
  } catch (error) {
    console.error(error);
  }
};

export const getItemProduct = async (link) => {
  return await (await database.ref('/test/' + link).once('value')).val();
};

export const getUrlProductImages = async (images) => {
  return Promise.all(images.map(async image => {
    try {
      const arrImagePath = image.path.split('');
      const insertPosition = arrImagePath.lastIndexOf('.'); //if(insertPosition === -1) return;

      arrImagePath.splice(insertPosition, 0, '_1024x786');

      const stringImagePath = arrImagePath.join('');
      
      const imageUrl = await storageRef.child(stringImagePath).getDownloadURL();
      
      return { ...image, url: imageUrl };
    } catch (error) {
      console.error(error);
    }
  }));
};

export const getShortItemsProduct = async () => {
  const itemsProduct = [];
  try {
    const itemsProductServer = await (await database.ref('/test').once('value')).val();

    for (let i in itemsProductServer) {
      
      const itemProduct = {
        link: itemsProductServer[i].link,
        name: itemsProductServer[i].name,
        costPerItem: Number(itemsProductServer[i].costPerItem),
        images: [
          {
            name: itemsProductServer[i].images[0].name,
            path: itemsProductServer[i].images[0].path,
            url: '',
          }
        ]
      };

      const itemImageWithUrl = await getUrlProductImages(itemProduct.images);

      itemsProduct.push({...itemProduct, images: itemImageWithUrl });
    }
  } catch (error) {
    alert(error);
  }
  console.log(itemsProduct);
  return itemsProduct;
};
