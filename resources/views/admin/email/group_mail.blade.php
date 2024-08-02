@extends('layouts.admin')

@section('title')
    @langg('Group Email')
@endsection

@section('breadcrumb')
    <section class="section">
        <div class="section-header">
            <h1>@langg('Group Email')</h1>
        </div>
    </section>
@endsection

@push('style')
    <style>
        .selectMultiple {
            width: 100%;
            position: relative;
            margin-bottom: 8px
        }

        .selectMultiple select {
            display: none;
        }

        .selectMultiple>div {
            position: relative;
            z-index: 2;
            padding: 8px 12px 2px 12px;
            border-radius: 8px;
            background: #fff;
            font-size: 14px;
            min-height: 44px;
            /* box-shadow: 0 4px 16px 0 rgba(22, 42, 90, 0.12); */
            border: 1px solid rgb(189, 189, 189);
            transition: box-shadow 0.3s ease;
        }

        .selectMultiple>div:hover {
            box-shadow: 0 4px 24px -1px rgba(22, 42, 90, 0.16);
        }

        .selectMultiple>div .arrow {
            right: 1px;
            top: 0;
            bottom: 0;
            cursor: pointer;
            width: 28px;
            position: absolute;
        }

        .selectMultiple>div .arrow:before,
        .selectMultiple>div .arrow:after {
            content: "";
            position: absolute;
            display: block;
            width: 2px;
            height: 8px;
            border-bottom: 8px solid #99A3BA;
            top: 43%;
            transition: all 0.3s ease;
        }

        .selectMultiple>div .arrow:before {
            right: 12px;
            transform: rotate(-130deg);
        }

        .selectMultiple>div .arrow:after {
            left: 9px;
            transform: rotate(130deg);
        }

        .selectMultiple>div span {
            color: #99A3BA;
            display: block;
            position: absolute;
            left: 12px;
            cursor: pointer;
            top: 8px;
            line-height: 28px;
            transition: all 0.3s ease;
        }

        .selectMultiple>div span.hide {
            opacity: 0;
            visibility: hidden;
            transform: translate(-4px, 0);
        }

        .selectMultiple>div a {
            position: relative;
            padding: 0 24px 6px 8px;
            line-height: 28px;
            color: #1E2330;
            display: inline-block;
            vertical-align: top;
            margin: 0 6px 0 0;
        }

        .selectMultiple>div a em {
            font-style: normal;
            display: block;
            white-space: nowrap;
        }

        .selectMultiple>div a:before {
            content: "";
            left: 0;
            top: 0;
            bottom: 6px;
            width: 100%;
            position: absolute;
            display: block;
            background: rgba(228, 236, 250, 0.7);
            z-index: -1;
            border-radius: 4px;
        }

        .selectMultiple>div a i {
            cursor: pointer;
            position: absolute;
            top: 0;
            right: 0;
            width: 24px;
            height: 28px;
            display: block;
        }

        .selectMultiple>div a i:before,
        .selectMultiple>div a i:after {
            content: "";
            display: block;
            width: 2px;
            height: 10px;
            position: absolute;
            left: 50%;
            top: 50%;
            background: #4D18FF;
            border-radius: 1px;
        }

        .selectMultiple>div a i:before {
            transform: translate(-50%, -50%) rotate(45deg);
        }

        .selectMultiple>div a i:after {
            transform: translate(-50%, -50%) rotate(-45deg);
        }

        .selectMultiple>div a.notShown {
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .selectMultiple>div a.notShown:before {
            width: 28px;
            transition: width 0.45s cubic-bezier(0.87, -0.41, 0.19, 1.44) 0.2s;
        }

        .selectMultiple>div a.notShown i {
            opacity: 0;
            transition: all 0.3s ease 0.3s;
        }

        .selectMultiple>div a.notShown em {
            opacity: 0;
            transform: translate(-6px, 0);
            transition: all 0.4s ease 0.3s;
        }

        .selectMultiple>div a.notShown.shown {
            opacity: 1;
        }

        .selectMultiple>div a.notShown.shown:before {
            width: 100%;
        }

        .selectMultiple>div a.notShown.shown i {
            opacity: 1;
        }

        .selectMultiple>div a.notShown.shown em {
            opacity: 1;
            transform: translate(0, 0);
        }

        .selectMultiple>div a.remove:before {
            width: 28px;
            transition: width 0.4s cubic-bezier(0.87, -0.41, 0.19, 1.44) 0s;
        }

        .selectMultiple>div a.remove i {
            opacity: 0;
            transition: all 0.3s ease 0s;
        }

        .selectMultiple>div a.remove em {
            opacity: 0;
            transform: translate(-12px, 0);
            transition: all 0.4s ease 0s;
        }

        .selectMultiple>div a.remove.disappear {
            opacity: 0;
            transition: opacity 0.5s ease 0s;
        }

        .selectMultiple>ul {
            margin: 0;
            padding: 0;
            list-style: none;
            font-size: 16px;
            z-index: 1;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            visibility: hidden;
            opacity: 0;
            border-radius: 8px;
            transform: translate(0, 20px) scale(0.8);
            transform-origin: 0 0;
            filter: drop-shadow(0 12px 20px rgba(22, 42, 90, 0.08));
            transition: all 0.4s ease, transform 0.4s cubic-bezier(0.87, -0.41, 0.19, 1.44), filter 0.3s ease 0.2s;
        }

        .selectMultiple>ul li {
            color: #1E2330;
            background: #fff;
            padding: 8px 16px;
            cursor: pointer;
            overflow: hidden;
            position: relative;
            font-size: 12px
            transition: background 0.3s ease, color 0.3s ease, transform 0.3s ease 0.3s, opacity 0.5s ease 0.3s, border-radius 0.3s ease 0.3s;
        }

        .selectMultiple>ul li:first-child {
            border-radius: 8px 8px 0 0;
        }

        .selectMultiple>ul li:first-child:last-child {
            border-radius: 8px;
        }

        .selectMultiple>ul li:last-child {
            border-radius: 0 0 8px 8px;
        }

        .selectMultiple>ul li:last-child:first-child {
            border-radius: 8px;
        }

        .selectMultiple>ul li:hover {
            background: #4D18FF;
            color: #fff;
        }

        .selectMultiple>ul li:after {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            width: 6px;
            height: 6px;
            background: rgba(0, 0, 0, 0.4);
            opacity: 0;
            border-radius: 100%;
            transform: scale(1, 1) translate(-50%, -50%);
            transform-origin: 50% 50%;
        }

        .selectMultiple>ul li.beforeRemove {
            border-radius: 0 0 8px 8px;
        }

        .selectMultiple>ul li.beforeRemove:first-child {
            border-radius: 8px;
        }

        .selectMultiple>ul li.afterRemove {
            border-radius: 8px 8px 0 0;
        }

        .selectMultiple>ul li.afterRemove:last-child {
            border-radius: 8px;
        }

        .selectMultiple>ul li.remove {
            transform: scale(0);
            opacity: 0;
        }

        .selectMultiple>ul li.remove:after {
            -webkit-animation: ripple 0.4s ease-out;
            animation: ripple 0.4s ease-out;
        }

        .selectMultiple>ul li.notShown {
            display: none;
            transform: scale(0);
            opacity: 0;
            transition: transform 0.35s ease, opacity 0.4s ease;
        }

        .selectMultiple>ul li.notShown.show {
            transform: scale(1);
            opacity: 1;
        }

        .selectMultiple.open>div {
            box-shadow: 0 4px 20px -1px rgba(22, 42, 90, 0.12);
        }

        .selectMultiple.open>div .arrow:before {
            transform: rotate(-50deg);
        }

        .selectMultiple.open>div .arrow:after {
            transform: rotate(50deg);
        }

        .selectMultiple.open>ul {
            transform: translate(0, 12px) scale(1);
            opacity: 1;
            visibility: visible;
            filter: drop-shadow(0 16px 24px rgba(22, 42, 90, 0.16));
        }

        @-webkit-keyframes ripple {
            0% {
                transform: scale(0, 0);
                opacity: 1;
            }

            25% {
                transform: scale(30, 30);
                opacity: 1;
            }

            100% {
                opacity: 0;
                transform: scale(50, 50);
            }
        }

        @keyframes ripple {
            0% {
                transform: scale(0, 0);
                opacity: 1;
            }

            25% {
                transform: scale(30, 30);
                opacity: 1;
            }

            100% {
                opacity: 0;
                transform: scale(50, 50);
            }
        }

        html {
            box-sizing: border-box;
            -webkit-font-smoothing: antialiased;
        }

        * {
            box-sizing: inherit;
        }

        *:before,
        *:after {
            box-sizing: inherit;
        }
    </style>
@endpush

@push('script')
    <script>
        $(document).ready(function() {

            var select = $('select[multiple]');
            var options = select.find('option');

            var div = $('<div />').addClass('selectMultiple');
            var active = $('<div />');
            var list = $('<ul />');
            var placeholder = select.data('placeholder');

            var span = $('<span />').text(placeholder).appendTo(active);

            options.each(function() {
                var text = $(this).text();
                if ($(this).is(':selected')) {
                    active.append($('<a />').html('<em>' + text + '</em><i></i>'));
                    span.addClass('hide');
                } else {
                    list.append($('<li />').html(text));
                }
            });

            active.append($('<div />').addClass('arrow'));
            div.append(active).append(list);

            select.wrap(div);

            $(document).on('click', '.selectMultiple ul li', function(e) {
                var select = $(this).parent().parent();
                var li = $(this);
                if (!select.hasClass('clicked')) {
                    select.addClass('clicked');
                    li.prev().addClass('beforeRemove');
                    li.next().addClass('afterRemove');
                    li.addClass('remove');
                    var a = $('<a />').addClass('notShown').html('<em>' + li.text() + '</em><i></i>').hide()
                        .appendTo(select.children('div'));
                    a.slideDown(400, function() {
                        setTimeout(function() {
                            a.addClass('shown');
                            select.children('div').children('span').addClass('hide');
                            select.find('option:contains(' + li.text() + ')').prop(
                                'selected', true);
                        }, 500);
                    });
                    setTimeout(function() {
                        if (li.prev().is(':last-child')) {
                            li.prev().removeClass('beforeRemove');
                        }
                        if (li.next().is(':first-child')) {
                            li.next().removeClass('afterRemove');
                        }
                        setTimeout(function() {
                            li.prev().removeClass('beforeRemove');
                            li.next().removeClass('afterRemove');
                        }, 200);

                        li.slideUp(400, function() {
                            li.remove();
                            select.removeClass('clicked');
                        });
                    }, 600);
                }
            });

            $(document).on('click', '.selectMultiple > div a', function(e) {
                var select = $(this).parent().parent();
                var self = $(this);
                self.removeClass().addClass('remove');
                select.addClass('open');
                setTimeout(function() {
                    self.addClass('disappear');
                    setTimeout(function() {
                        self.animate({
                            width: 0,
                            height: 0,
                            padding: 0,
                            margin: 0
                        }, 300, function() {
                            var li = $('<li />').text(self.children('em').text())
                                .addClass('notShown').appendTo(select.find('ul'));
                            li.slideDown(400, function() {
                                li.addClass('show');
                                setTimeout(function() {
                                    select.find('option:contains(' +
                                        self.children('em')
                                        .text() + ')').prop(
                                        'selected', false);
                                    if (!select.find(
                                            'option:selected')
                                        .length) {
                                        select.children('div')
                                            .children('span')
                                            .removeClass('hide');
                                    }
                                    li.removeClass();
                                }, 400);
                            });
                            self.remove();
                        })
                    }, 300);
                }, 400);
            });

            $(document).on('click', '.selectMultiple > div .arrow, .selectMultiple > div span', function(e) {
                $(this).parent().parent().toggleClass('open');
            });

        });
    </script>
@endpush

@section('content')
    <div class="row justify-content-center">
        <div class="col-lg-12">
            <div class="card mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">{{ translate('Group Mail Form') }}</h6>
                    <a href="{{ route('admin.user.index') }}" class="btn btn-primary"><i class="fas fa-backward"></i>
                        @langg('Back')</a>
                </div>
                <div class="card-body">
                    <form action="{{ route('admin.group.submit') }}" enctype="multipart/form-data" method="POST">
                        @csrf
                        <label for="users">Select users</label>
                        <select name="users[]" id="users" multiple data-placeholder="Add tools">
                            <option value="*" selected>All Users</option>
                            @foreach ($users as $user)
                                <option value="{{$user->id}}">{{$user->name}}</option>
                            @endforeach
                        </select>

                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="subject">{{ translate('Email Subject') }}</label>
                                    <input type="text" class="form-control" name="subject" id="subject"
                                        placeholder="{{ translate('Email Subject') }}">
                                </div>
                            </div>

                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="body">{{ translate('Message') }}</label>
                                    <textarea id="body" class="form-control summernote" name="message" rows="5"
                                        placeholder="{{ translate('Description') }}"></textarea>
                                </div>
                            </div>
                            <div class="col-md-12 text-right">
                                <button type="submit" class="btn btn-primary btn-lg">{{ __('Submit') }}</button>
                            </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection
