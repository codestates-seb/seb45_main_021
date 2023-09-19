//포트폴리오 작성시 기본 데이터
export const portfolioWriteInitData = {
    title:'',
    lang : '',
    isComment : 0,
    isEmploy : 0, 
    tags : [],
    body : '',
    titleImageFile : new FormData(),
    titleImageUrl : '',
    imageFile : new FormData(),
    imageUrls : '',
}


//포트폴리오 작성시에 기본적으로 존재하는 룰
export const portfolioErrorInitData = {
    title : false,
    body : false,
    lang : false,
    titleImageFile: false,
}

//프로트폴리오 작성시 룰
export const portfolioWriteRule = {
    title : {
      min : 10,
      max : 30,
    },
    lang : {
      min : 1,
      max : 1,
    },
    body : {
      min : 200,
      max : 1000,
    },
}