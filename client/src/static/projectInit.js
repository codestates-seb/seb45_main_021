//프로젝트 작성시 기본 데이터들
export const projectWriteInitData = {
    title:'',
    language : '',
    totalPeople : '',
    closed_At : new Date(new Date().setDate(new Date().getDate() + 7)),
    tags : [],
    body : '',
    description : '',
    titleImg : new FormData(),
    imgs : new FormData(),
    author : {}
}

//기본적으로 존재하는 프로젝트 에러들
export const projectErrorInitData = {
    title : false,
    body : false,
    language : false,
    totalPeople : false,
    titleImg: false,
}

//프로젝트 작성시 룰
export const projectWriteRule = {
    title : {
        min : 10,
        max : 30,
      },
      language : {
        min : 1,
        max : 1,
      },
      totalPeople : {
        min : 1,
        max : 1,
      },
      closed_At : {
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