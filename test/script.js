const body = document.querySelector('#body')
const like = (e, likes) => {
    var requestOptions = {
        method: 'PATCH',
        redirect: 'follow'
      };
      
      fetch("http://test/posts/"+e.target.getAttribute('data-id')+"/like", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
        e.target.textContent = `Лайков: ${parseInt(likes)+1}`
}

const clickpostdelete = (e) => {
    e.target.parentElement.remove()
    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
      };
      
      fetch("http://test/posts/"+e.target.getAttribute('data-id'), requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

const addPost = (title, text, date, views, likes, id, image) => {
    const post = document.createElement('div')
    post.setAttribute('class', 'post')
    const header = document.createElement('h2')
    header.setAttribute('class', 'post-title')
    header.textContent = title;
    post.appendChild(header)
    const postDate = document.createElement('p')
    postDate.setAttribute('class', 'post-date')
    postDate.textContent = date;
    post.appendChild(postDate)
    const postText = document.createElement('p')
    postText.setAttribute('class', 'post-text')
    postText.textContent = text;
    post.appendChild(postText)
    const postInfo = document.createElement('p')
    postInfo.setAttribute('class', 'post-info')
    postInfo.textContent = `Просмотров: ${views} `
    const postInfoLike = document.createElement('a')
    postInfoLike.href = '#'
    postInfoLike.textContent = `Лайков: ${likes}`
    postInfoLike.onclick = (e) => like(e,likes);
    postInfoLike.setAttribute('data-id', id)
    postInfo.appendChild(postInfoLike)
    post.appendChild(postInfo)
    const postImage = document.createElement('img')
    postImage.src = 'data:image/png;base64, '+ image;
    postImage.setAttribute('class','post-image')
    post.appendChild(postImage)
    const postDelete = document.createElement('Button')
    postDelete.setAttribute('class','post-delete')
    postDelete.setAttribute('data-id', id)
    postDelete.textContent = 'Удалить'
    postDelete.onclick = clickpostdelete
    post.appendChild(postDelete)
    body.insertBefore(post,body.firstChild)
}

let data;
(async () => {
    let response = await fetch('http://test/posts'); // завершается с заголовками ответа
    let result = await response.json(); // читать тело ответа в формате JSON
    data = result;
    console.log(data);
    data.forEach(item => addPost(item.title, item.text, item.date, item.views, item.likes, item.post_id, item.image))
})()

const form = document.querySelector('form')
const inputTitle = document.querySelector('#input-title')
const inputText = document.querySelector('#input-text')
const inputFile = document.querySelector('#input-file')
const submit = async event => {
    event.preventDefault()
    currDate = new Date()
    dateText = `${currDate.getFullYear()}-${currDate.getMonth() + 1 < 10 ? '0' : ''}${currDate.getMonth() + 1}-${currDate.getDate()} ${currDate.getHours()}:${currDate.getMinutes()}:${currDate.getSeconds()}`
    addPost(inputTitle.value, inputText.value, dateText, 0, 0)

    var formdata = new FormData();
    formdata.append("title", inputTitle.value);
    formdata.append("text", inputText.value);
    formdata.append("file", inputFile.files[0]);

    var requestOptions = {
        method: 'POST',
        body: formdata,

    };

    fetch("http://test/posts", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error))
        .then(() =>  location.reload());
  
}
form.onsubmit = submit;






