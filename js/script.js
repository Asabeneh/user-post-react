const rootElement = document.getElementById("root");
const randomId = () => {
  const numbersLetters = "0123456789abcdefghijklmnopqrstuvwzyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split(
    ""
  );
  let randId = "";
  let randIndex;
  for (let i = 0; i < 6; i++) {
    randIndex = Math.floor(Math.random() * numbersLetters.length);
    randId += numbersLetters[randIndex];
  }
  return randId;
};
const displayDateTime = () => {
  let now = new Date();
  let year = now.getFullYear(),
    month = now.getMonth() + 1,
    date = now.getDate(),
    hours = now.getHours(),
    minutes = now.getMinutes();
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  let dateMonthYear = date + "." + month + "." + year;
  let time = hours + ":" + minutes;
  let fullTime = dateMonthYear + " " + time;
  return fullTime;
};

class AddPost extends React.Component {
  state = { text: "" };
  handleChange = e => {
    this.setState({
      text: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.addPost(this.state.text);
    console.log(this.state.text);
    this.setState({
      text: ""
    });
  };
  render() {
    let wordCount = 250 - this.state.text.length;
    let buttonStatus = wordCount < 250;

    let buttonClass = buttonStatus ? "activeButton" : "disabledButton";

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <textarea
            cols="90"
            rows="10"
            type="text"
            name="Post"
            placeholder="Enter Post"
            ref="Post"
            value={this.state.text}
            onChange={this.handleChange}
          />
          <p className={wordCount < 0 ? "red-text" : "other"}>{wordCount}</p>
        </div>
        <div>
          <button className={buttonClass} disabled={!buttonStatus}>
            Add Post
          </button>
        </div>
      </form>
    );
  }
}

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      checked: false
    };
  }
  editPost = () => {
    this.setState({
      editing: true
    });
  };
  deletePost = () => {
    this.props.removePost(this.props.index);
  };
  savePost = () => {
    let text = this.refs.newText.value;
    this.props.editPost(text, this.props.index);

    this.setState({
      editing: false
    });
  };
  cancelEditing = () => {
    this.setState({
      editing: false
    });
  };
  handleChecked = () => {
    this.setState({
      checked: !this.state.checked
    });
  };
  renderForm = () => {
    return (
      <div className="Posts">
        <textarea defaultValue={this.props.children} ref="newText" /> <br />
        <button className="save-button" onClick={this.savePost}>
          Save
        </button>
        <button className="cancel-button" onClick={this.cancelEditing}>
          Cancel
        </button>
      </div>
    );
  };
  renderPost = () => {
    return (
      <div className="post">
        <div className="user-info">
          <i className="fas fa-user" />
          <h4>
            {this.props.user} <span>@{this.props.firstName}</span>
          </h4>
        </div>

        <div className="post-text">
          <p>{this.props.children}</p>
        </div>
        <div className="post-detail">
          <div>
            <i onClick={this.editPost} className="far fa-edit" />
            <i onClick={this.deletePost} className="far fa-trash-alt" />
          </div>
          <div className="post-activity">
            <i className="far fa-comment" />
            <i className="far fa-heart" />
            <i className="fas fa-retweet" />
          </div>
          <div>
            <small>{this.props.date}</small>
          </div>
        </div>
      </div>
    );
  };
  render() {
    return !this.state.editing ? this.renderPost() : this.renderForm();
  }
}

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [
        {
          id: randomId(),
          date: displayDateTime(),
          user: "Asabeneh Yetayeh",
          post:'Welcome to Washera Academy! This is a CRUD React tutorial. In this tutorial, you will learn most part of react by implementing  the CRUD(Create, Read, Update and Delete) operations in this mini project.',
          postInfo: [{ comment: 0 }, { repost: 0 }, { hearts: 0 }]
        },
        {
          id: randomId(),
          date: displayDateTime(),
          user: "Asabeneh Yetayeh",
          post:"I just released my first React tutorial on YouTube. I hope it will help some people to get started React.js. If you like what you got on this channel subscribe for more videos and share to your friends.",
          postInfo: [{ comment: 0 }, { repost: 0 }, { hearts: 0 }]
        },
        {
          id: randomId(),
          date: displayDateTime(),
          user: "Asabeneh Yetayeh",
          post:"To get started React, you should to know about HTML, CSS and JavaScript. If don't have to be a JavaScript ninja to start learning React. If you like to learn JavaScript. Check the JavaScript Tutorial on Washara Academy.",
          postInfo: [{ comment: 0 }, { repost: 0 }, { hearts: 0 }]
        },
        {
          id: randomId(),
          date: displayDateTime(),
          user: "Asabeneh Yetayeh",
          post:
            "I love teaching and I love to teach, I will teach everything I knew. If you are good at somethng why not teaching to someone. When you teach you learn more.",
          postInfo: [{ comment: 0 }, { repost: 0 }, { hearts: 0 }]
        },
        {
          id: randomId(),
          date: displayDateTime(),
          user: "Asabeneh Yetayeh",
          post:"For more videos about HTML, CSS, JavaScript, React, Node.js, MongoDB and Pyton checkout Washera Academy. Project based tutorials on different topics will be released on Washera Academy.",
          postInfo: [{ comment: 0 }, { repost: 0 }, { hearts: 0 }]
        }
      ],
      checked: false
    };
  }
  addPost = text => {
    let id = randomId();
    let date = displayDateTime();
    if (text.length) {
      this.setState({
        posts: [
          ...this.state.posts,
          {
            id,
            date,
            post: text,
            user: "Anonymous User",
            postInfo: [{ comment: 0 }, { repost: 0 }, { hearts: 0 }]
          }
        ]
      });
    }
  };
  editPost = () => {
    this.setState({ editing: true });
  };

  removePost = position => {
    let arr = this.state.posts;
    arr.splice(position, 1);
    this.setState({
      posts: arr
    });
  };
  savePost = (newText, i) => {
    let arr = this.state.posts;
    arr[i].post = newText;
    this.setState({
      posts: arr,
      editing: false
    });
  };
  cancelEditing = () => {
    this.setState({
      editing: false
    });
  };
  eachPost = () => {
    return this.state.posts.map((postObj, i) => {
      let { id, date, post, user } = postObj;
      let firstName = user.split(" ")[0];
      return (
        <Post
          key={"id" + i}
          removePost={this.removePost}
          editPost={this.savePost}
          index={i}
          id={id}
          date={date}
          user={user}
          firstName={firstName}
        >
          {post}
        </Post>
      );
    });
  };
  render() {
    return (
      <div className="wrapper">
        <AddPost addPost={this.addPost} />
        {this.eachPost()}
      </div>
    );
  }
}
ReactDOM.render(<Posts />, rootElement);
