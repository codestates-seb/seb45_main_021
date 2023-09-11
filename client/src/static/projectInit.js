//프로젝트 작성시 기본 데이터들
export const projectWriteInitData = {
    title:'',
    lang : '',
    totalPeople : '',
    closedAt : String(new Date(new Date().setDate(new Date().getDate() + 7))),
    tags : [],
    body : '',
    description : '',
    titleImageFile : new FormData(),
    imageFile : new FormData(),
}

//기본적으로 존재하는 프로젝트 에러들
export const projectErrorInitData = {
    title : false,
    body : false,
    lang : false,
    totalPeople : false,
    titleImageFile: false,
}

//프로젝트 작성시 룰
export const projectWriteRule = {
    title : {
        min : 10,
        max : 30,
      },
      lang : {
        min : 1,
        max : 1,
      },
      totalPeople : {
        min : 1,
        max : 1,
      },
      closedAt : {
        min : 1,
        max : 1,
      },
      body : {
        min : 100,
        max : 500,
      },
      description : {
        min : 0,
        max : 200,
      }
}