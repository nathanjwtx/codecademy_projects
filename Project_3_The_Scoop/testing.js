let database = {
    users: {},
    articles: {},
    nextArticleId: 1,
    comments: {},
    nextCommentId: 1
};

function createComment(request) {
    const requestArticle = request; // && request.body.article;
    // console.log(requestArticle);
    const response = {};
    if (requestArticle) {
        // const newComment = {
        //     body: requestArticle.body,
        //     username: requestArticle.username,
        //     id: requestArticle.articleId,
        // };
        database.comments[database.nextCommentId] = {}
        database.comments[database.nextCommentId].id = requestArticle.articleId;
        database.comments[database.nextCommentId].username = requestArticle.username;
        database.comments[database.nextCommentId].body = requestArticle.body;
        // let newC = {[database.nextCommentId] : newComment};
        // database.comments = {...database.comments, ...newC};
        // console.log(database);
        // database.users[comment.username].commentIds.push(comment.id);
        // response.body = {comment : newComment};
        database.nextCommentId++;
        // console.log(response);
        response.status = 201;
    } else {
        response.status = 400;
    }
    console.log(database);
    return response;
}

const newComment = {
    body: "Comment Body",
    username: "existing_user",
    articleId: 1
};
const newComment1 = {
    body: "Comment Body",
    username: "existing_user",
    articleId: 1
};

// console.log(createComment(newComment));
createComment(newComment);
createComment(newComment1);