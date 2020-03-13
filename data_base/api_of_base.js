import { database, storageRef } from './base';

const deleteProductImage = async image => {
  try {
    const arrImagePath = image.path.split('');
    const insertPosition = arrImagePath.lastIndexOf('.'); //if(insertPosition === -1) return;

    arrImagePath.splice(insertPosition, 0, '_1024x786');

    const stringImagePath = arrImagePath.join('');

    await storageRef.child(stringImagePath).delete();
    return null;
  } catch (err) {
    return err;
  }
};

const saveImages = async (image, link) => {
  try {
      const imagePath = storageRef.child(`product/${link}/${image.name}`);

      const response = await fetch(image.url, { method: 'GET' });
      const reader = response.body.getReader();
      const { value } = await reader.read();
      const blob = new Blob([value], { type: image.type });
      await imagePath.put(blob);

      return {...image, path: `product/${link}/${image.name}` };
  } catch (err) {
    return err;
  }
};

const updateImages = async (images, link) => {
  try {
  return await Promise.all(images.map(async (image) => {
      if (image.delete) {
        return await deleteProductImage(image);
      }

      if (image.path === '') {
        return await saveImages(image, link);
      }

      return image;
  }));
  } catch (err) {
    console.error(err);
  }
};

const getUrlProductImages = async (images) => {
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

export const postProduct = async (product) => {
  try {
    const images = await updateImages(product.images, product.link);
    
    await database.ref(`/test/${product.link}`).set({ ...product, images });
    return { ...product, images };
  } catch (error) {
    console.error(error);
  }
};

export const dbGetItemProduct = async (link) => {
  const data = await database.ref('/test/' + link).once('value');

  const productItem = await data.val();
  
  if( productItem !== null ) {
    const productImages = productItem.images ? await getUrlProductImages(productItem.images) : null;
    productItem.images = productImages;
    
  }
  return productItem;
};

export const deleteItemProduct = async (link) => {
  try {
    const product = await dbGetItemProduct(link);

    if(product.images && product.images.length) {
      await Promise.all(product.images.map(image => deleteProductImage(image)));
    }

    await database.ref(`/test/${product.link}`).remove();
    return product.link;
  } catch (error) {
    console.error(error);
  }
};

export const getShortListProducts = async () => {
  const itemsProduct = [];
  try {
    const itemsProductServer = await (await database.ref('/test').once('value')).val();

    for (let i in itemsProductServer) {
      const hasImage = itemsProductServer[i].images ? itemsProductServer[i].images.length ? true : false : false ;

      const itemProduct = {
        link: itemsProductServer[i].link,
        name: itemsProductServer[i].name,
        costPerItem: Number(itemsProductServer[i].costPerItem),
        sizes: itemsProductServer[i].sizes,
        colors: itemsProductServer[i].colors,
        details: itemsProductServer[i].details,
        images: hasImage ? [{
            name: itemsProductServer[i].images[0].name,
            path: itemsProductServer[i].images[0].path,
            url: '',
          }] : null,
      };

      const itemImageWithUrl = itemProduct.images ? await getUrlProductImages(itemProduct.images) : null;
      itemsProduct.push({...itemProduct, images: itemImageWithUrl });
    }
  } catch (error) {
    console.error(error);
  }
  return itemsProduct;
};



// The function must change in future
export const dbCheckLinkIsMatch = async (link) => {
  console.log('dbCheckLinkIsMatch -> link', link);
  const listProducts = await getShortListProducts();
  const linkIsMatch = Boolean(listProducts.find(item => item.link === link));

  // console.log(listProducts);
  // console.log(linkIsMatch);
  return linkIsMatch;
};