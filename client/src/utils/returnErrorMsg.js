export function returnErrorMsg (err,type) {
    let errMsg = '';
    for(let key in err) {
        if(key === 'title') {
            errMsg+='제목은 최소 10 글자부터 30 글자 까지 가능합니다.\n';
        } else if (key === 'lang') {
            errMsg+='개발 언어 선택은 필수 입니다.\n';
        } else if (key === 'totalPeople') {
            errMsg+='프로젝트 모집 인원 선택은 필수 입니다.\n';
        } else if (key === 'body') {
            if(type === 'project') {
                errMsg+='프로젝트 설명은 최소 100글자에서 최대 500글자 입니다.\n';
            } else if (type === 'portfolio') {
                errMsg+='포트폴리오 설명은 최소 500글자에서 최대 1000글자 입니다.\n';
            }
        } else if (key === 'closedAt') {
            errMsg+='프로젝트 마감 날짜 선택은 필수 입니다.\n';
        } else if (key === 'titleImageFile') {
            errMsg+='타이틀 이미지 선택은 필수 입니다.\n';
        }
    }
    return errMsg;
}