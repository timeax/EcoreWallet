@extends('layouts.admin')

@section('title')
    @langg('Live Chats')
@endsection

@section('breadcrumb')
    <section class="section">
        <div class="section-header">
            <h1>@langg('Live Chats')</h1>
        </div>
    </section>
@endsection

@section('content')
    <style>
        .container {
            padding: 0;
            background-color: #FFF;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
            height: 700px;
        }

        /* ===== MENU ===== */
        .menu {
            float: left;
            height: 700px;
            ;
            width: 70px;
            background: rgb(175, 175, 175);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19);
        }

        .menu .items {
            list-style: none;
            margin: auto;
            padding: 0;
        }

        .menu .items .item {
            height: 70px;
            border-bottom: 1px solid #6780cc;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #9fb5ef;
            font-size: 17pt;
        }

        .menu .items .item-active {
            background-color: #5172c3;
            color: #FFF;
        }

        .menu .items .item:hover {
            cursor: pointer;
            background-color: #4f6ebd;
            color: #cfe5ff;
        }

        /* === CONVERSATIONS === */

        .discussions {
            width: 35%;
            height: 700px;
            /* box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.20); */
            overflow: hidden;
            background-color: #87a3ec;
            display: inline-block;
        }

        .discussions .discussion {
            width: 100%;
            height: 90px;
            background-color: #FAFAFA;
            border-bottom: solid 1px #E0E0E0;
            display: flex;
            align-items: center;
            cursor: pointer;
        }

        .discussions .search {
            display: flex;
            align-items: center;
            justify-content: center;
            color: #E0E0E0;
        }

        .discussions .search .searchbar {
            height: 40px;
            background-color: #FFF;
            width: 70%;
            padding: 0 20px;
            border-radius: 50px;
            border: 1px solid #EEEEEE;
            display: flex;
            align-items: center;
            cursor: pointer;
        }

        .discussions .search .searchbar input {
            margin-left: 15px;
            height: 38px;
            width: 100%;
            border: none;
            font-family: 'Montserrat', sans-serif;
            ;
        }

        .discussions .search .searchbar *::-webkit-input-placeholder {
            color: #E0E0E0;
        }

        .discussions .search .searchbar input *:-moz-placeholder {
            color: #E0E0E0;
        }

        .discussions .search .searchbar input *::-moz-placeholder {
            color: #E0E0E0;
        }

        .discussions .search .searchbar input *:-ms-input-placeholder {
            color: #E0E0E0;
        }

        .discussions .message-active {
            width: 98.5%;
            height: 90px;
            background-color: #FFF;
            border-bottom: solid 1px #E0E0E0;
        }

        .discussions .discussion .photo {
            margin-left: 20px;
            display: block;
            width: 45px;
            height: 45px;
            background: #E6E7ED;
            -moz-border-radius: 50px;
            -webkit-border-radius: 50px;
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
        }

        .online {
            position: relative;
            top: 30px;
            left: 35px;
            width: 13px;
            height: 13px;
            background-color: #8BC34A;
            border-radius: 13px;
            border: 3px solid #FAFAFA;
        }

        .desc-contact {
            height: 43px;
            width: 50%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .discussions .discussion .name {
            margin: 0 0 0 20px;
            font-family: 'Montserrat', sans-serif;
            font-size: 11pt;
            color: #515151;
        }

        .discussions .discussion .message {
            margin: 6px 0 0 20px;
            font-family: 'Montserrat', sans-serif;
            font-size: 9pt;
            color: #515151;
        }

        .timer {
            margin-left: 15%;
            font-family: 'Open Sans', sans-serif;
            font-size: 11px;
            padding: 3px 8px;
            color: #BBB;
            background-color: #FFF;
            border: 1px solid #E5E5E5;
            border-radius: 15px;
        }

        .chat {
            width: calc(65% - 15px);
        }

        .header-chat {
            background-color: #FFF;
            height: 90px;
            box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.100);
            display: flex;
            align-items: center;
        }

        .chat .header-chat .icon {
            margin-left: 30px;
            color: #515151;
            font-size: 14pt;
        }

        .chat .header-chat .name {
            margin: 0 0 0 20px;
            text-transform: uppercase;
            font-family: 'Montserrat', sans-serif;
            font-size: 13pt;
            color: #515151;
        }

        .chat .header-chat .right {
            position: absolute;
            right: 40px;
        }

        .chat .messages-chat {
            padding: 25px 35px;
        }

        .chat .messages-chat .message {
            display: flex;
            align-items: center;
            margin-bottom: 8px;
        }

        .chat .messages-chat .message .photo {
            display: block;
            width: 45px;
            height: 45px;
            background: #E6E7ED;
            -moz-border-radius: 50px;
            -webkit-border-radius: 50px;
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
        }

        .chat .messages-chat .text {
            margin: 0 35px;
            background-color: #f6f6f6;
            padding: 15px;
            border-radius: 12px;
        }

        .text-only {
            margin-left: 45px;
        }

        .time {
            font-size: 10px;
            color: lightgrey;
            margin-bottom: 10px;
            margin-left: 85px;
        }

        .response-time {
            float: right;
            margin-right: 40px !important;
        }

        .response {
            float: right;
            margin-right: 0px !important;
            margin-left: auto;
            /* flexbox alignment rule */
        }

        .response .text {
            background-color: #e3effd !important;
        }

        .footer-chat {
            width: calc(65% - 66px);
            height: 80px;
            display: flex;
            align-items: center;
            position: absolute;
            bottom: 0;
            background-color: transparent;
            border-top: 2px solid #EEE;

        }

        .chat .footer-chat .icon {
            margin-left: 30px;
            color: #C0C0C0;
            font-size: 14pt;
        }

        .chat .footer-chat .send {
            color: #fff;
            background-color: #4f6ebd;
            position: absolute;
            right: 50px;
            padding: 12px 12px 12px 12px;
            border-radius: 50px;
            font-size: 14pt;
        }

        .chat .footer-chat .name {
            margin: 0 0 0 20px;
            text-transform: uppercase;
            font-family: 'Montserrat', sans-serif;
            font-size: 13pt;
            color: #515151;
        }

        .chat .footer-chat .right {
            position: absolute;
            right: 40px;
        }

        .write-message {
            border: none !important;
            width: 60%;
            height: 50px;
            margin-left: 20px;
            padding: 10px;
        }

        .footer-chat *::-webkit-input-placeholder {
            color: #C0C0C0;
            font-size: 13pt;
        }

        .footer-chat input *:-moz-placeholder {
            color: #C0C0C0;
            font-size: 13pt;
        }

        .footer-chat input *::-moz-placeholder {
            color: #C0C0C0;
            font-size: 13pt;
            margin-left: 5px;
        }

        .footer-chat input *:-ms-input-placeholder {
            color: #C0C0C0;
            font-size: 13pt;
        }

        .clickable {
            cursor: pointer;
        }
    </style>
    <div class="row justify-content-center mt-3">
        <div class="col-lg-12 mb-4">
            <div class="container">
                <div class="row">
                    <section class="discussions">
                        <div class="discussion search">
                            <div class="searchbar">
                                <i class="fa fa-search" aria-hidden="true"></i>
                                <input type="text" placeholder="Search..."></input>
                            </div>
                        </div>
                        <div class="discussion message-active">
                            <div class="photo"
                                style="background-image: url(https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80);">
                                <div class="online"></div>
                            </div>
                            <div class="desc-contact">
                                <p class="name">Megan Leib</p>
                                <p class="message">9 pm at the bar if possible 😳</p>
                            </div>
                            <div class="timer">12 sec</div>
                        </div>

                        <div class="discussion">
                            <div class="photo"
                                style="background-image: url(https://i.pinimg.com/originals/a9/26/52/a926525d966c9479c18d3b4f8e64b434.jpg);">
                                <div class="online"></div>
                            </div>
                            <div class="desc-contact">
                                <p class="name">Dave Corlew</p>
                                <p class="message">Let's meet for a coffee or something today ?</p>
                            </div>
                            <div class="timer">3 min</div>
                        </div>

                        <div class="discussion">
                            <div class="photo"
                                style="background-image: url(https://images.unsplash.com/photo-1497551060073-4c5ab6435f12?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80);">
                            </div>
                            <div class="desc-contact">
                                <p class="name">Jerome Seiber</p>
                                <p class="message">I've sent you the annual report</p>
                            </div>
                            <div class="timer">42 min</div>
                        </div>

                        <div class="discussion">
                            <div class="photo"
                                style="background-image: url(https://card.thomasdaubenton.com/img/photo.jpg);">
                                <div class="online"></div>
                            </div>
                            <div class="desc-contact">
                                <p class="name">Thomas Dbtn</p>
                                <p class="message">See you tomorrow ! 🙂</p>
                            </div>
                            <div class="timer">2 hour</div>
                        </div>

                        <div class="discussion">
                            <div class="photo"
                                style="background-image: url(https://images.unsplash.com/photo-1553514029-1318c9127859?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80);">
                            </div>
                            <div class="desc-contact">
                                <p class="name">Elsie Amador</p>
                                <p class="message">What the f**k is going on ?</p>
                            </div>
                            <div class="timer">1 day</div>
                        </div>

                        <div class="discussion">
                            <div class="photo"
                                style="background-image: url(https://images.unsplash.com/photo-1541747157478-3222166cf342?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=967&q=80);">
                            </div>
                            <div class="desc-contact">
                                <p class="name">Billy Southard</p>
                                <p class="message">Ahahah 😂</p>
                            </div>
                            <div class="timer">4 days</div>
                        </div>

                        <div class="discussion">
                            <div class="photo"
                                style="background-image: url(https://images.unsplash.com/photo-1435348773030-a1d74f568bc2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80);">
                                <div class="online"></div>
                            </div>
                            <div class="desc-contact">
                                <p class="name">Paul Walker</p>
                                <p class="message">You can't see me</p>
                            </div>
                            <div class="timer">1 week</div>
                        </div>
                    </section>
                    <section class="chat">
                        <div class="header-chat">
                            <i class="icon fa fa-user-o" aria-hidden="true"></i>
                            <p class="name">Megan Leib</p>
                            <i class="icon clickable fa fa-history right" aria-hidden="true"></i>
                        </div>
                        <div class="messages-chat">
                            <div class="message">
                                <div class="photo"
                                    style="background-image: url(https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80);">
                                    <div class="online"></div>
                                </div>
                                <p class="text"> Hi, how are you ? </p>
                            </div>
                            <div class="message text-only">
                                <p class="text"> What are you doing tonight ? Want to go take a drink ?</p>
                            </div>
                            <p class="time"> 14h58</p>
                            <div class="message text-only">
                                <div class="response">
                                    <p class="text"> Hey Megan ! It's been a while 😃</p>
                                </div>
                            </div>
                            <div class="message text-only">
                                <div class="response">
                                    <p class="text"> When can we meet ?</p>
                                </div>
                            </div>
                            <p class="response-time time"> 15h04</p>
                            <div class="message">
                                <div class="photo"
                                    style="background-image: url(https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80);">
                                    <div class="online"></div>
                                </div>
                                <p class="text"> 9 pm at the bar if possible 😳</p>
                            </div>
                            <p class="time"> 15h09</p>
                        </div>
                        <div class="footer-chat">
                            <i class="icon fa fa-file clickable" style="font-size:20pt;" aria-hidden="true"></i>
                            <input type="text" class="write-message" placeholder="Type your message here"></input>
                            <i class="icon send fa fa-paper-plane-o clickable" aria-hidden="true"></i>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
    <script defer>
        setTimeout(() => {
            window.Echo.private(`App.Models.Admin.{{admin()->id}}`).notification((notification) => {
                if(notification.type === 'chat') {

                }
            })
        }, 3000);
    </script>
@endsection
