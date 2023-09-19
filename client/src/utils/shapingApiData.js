export const shapingApiData = (obj,type) => {
    const newData = {...obj};
    for(let key in obj) {
        if(key === 'images') {
            const tempArr = [];
            for(let i = 0; i < obj[key].length; i++) {
                tempArr.push(obj[key][i].imageUrl);
            }
            newData[key] = tempArr;
            newData.imageFile = new FormData();
            newData.imageUrls = [];
        } else if (key === 'projectTitleImage' || key === 'portfolioTitleImage') {
            newData.titleImage = [obj[key].imageUrl];
            newData.titleImageFile = new FormData();
            newData.titleImageUrl = '';
        }
        
    }
    return newData;
}
