import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ socket }) => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => checkIsDisabled(), [userName]);

    const checkIsDisabled = (e) => {
        if (userName.trim().length === 0) setIsDisabled(true);
        else if (userName.trim().length >= 4) setIsDisabled(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        checkIsDisabled();
        localStorage.setItem("userName", userName);
        socket.emit("newUser", { userName, socketID: socket.id });

        navigate("/chat");
    };
    return (
        <div className='home__container'>
            <div className='home__header'>
                <h1>Welcome to Group Chat</h1>
                <p>A Group chat app to talk to your loved onces</p>
            </div>
            <form className='form__container' onSubmit={handleSubmit}>
                <div className='form__field'>
                    <label htmlFor='username'>Username</label>
                    <input
                        type='text'
                        minLength={4}
                        name='username'
                        id='username'
                        className='username__input'
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
                <button className='home__cta' disabled={isDisabled}>
                    SIGN IN
                </button>
            </form>
        </div>
    );
};

export default Home;
