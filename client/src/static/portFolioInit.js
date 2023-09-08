//포트폴리오 작성시 기본 데이터
export const portFolioWriteInitData = {
    title:'',
    language : '',
    isComments : false,
    tags : [],
    body : '',
    titleImg : '',
    imgs : new FormData(),
    author : {}
}

//포트폴리오 작성시에 기본적으로 존재하는 룰
export const portFolioErrorInitData = {
    title : false,
    body : false,
    language : false,
    titleImg: false,
}

//프로트폴리오 작성시 룰
export const portFolioWriteRule = {
    title : {
        min : 10,
        max : 30,
      },
      language : {
        min : 1,
        max : 1,
      },
      body : {
        min : 200,
        max : 1000,
      },
}