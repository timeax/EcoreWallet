<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ecore Wallet Footer</title>
    <style>
        .footer-section {
            margin-bottom: 20px;
        }
        .footer-section h3 {
            margin-bottom: 10px;
            color: #FFFFFF; /* Header color */
        }
        .footer-section ul {
            list-style-type: none;
            padding-left: 0;
        }
        .footer-section ul li {
            margin-bottom: 5px;
        }
        .footer-section ul li a {
            color: #626d87; /* Light green color for page options */
            text-decoration: none;
        }
        .footer-section ul li a:hover {
            text-decoration: underline; /* Optional: underline on hover */
        }

        /* Custom CSS to remove white border around Live Chat */
        .smartsupp-bubble,
        .smartsupp-button,
        .smartsupp-chat,
        .smartsupp-widget,
        .smartsupp-widget-fixed,
        .smartsupp-widget-bubble,
        .smartsupp-chat-container,
        .smartsupp-button-wrapper,
        .smartsupp-button svg {
            border: none !important;
            box-shadow: none !important;
            background: transparent !important;
            padding: 0 !important;
            margin: 0 !important;
        }
        /* Additional specific targeting for Smartsupp widget */
        .smartsupp-bubble-wrapper,
        .smartsupp-floating-bubble,
        .smartsupp-button-container {
            border: none !important;
            box-shadow: none !important;
            background: transparent !important;
            padding: 0 !important;
            margin: 0 !important;
        }
    </style>
</head>
<body>
    <footer class="sc-295ed20e-0 jVmIJ">
        <section class="sc-166b3fb7-0 eaWoLa undefined">
            <div class="sc-166b3fb7-1 fcWrJT">
                <div class="sc-295ed20e-1 fCcZUl">
                    <div class="sc-295ed20e-2 doQVff">
                        <a class="sc-295ed20e-4 eJFDVb" href="index.php">
                            <img alt="Ecore Wallet Logo" loading="lazy" width="192.09" height="26" decoding="async" data-nimg="1" style="color:transparent;width:auto;height:100%" src="https://uploads-ssl.webflow.com/631c2a6f341fb51bba7a6369/66622558914e4ce4934a76b3_ecore-horizontal-logo.png" />
                        </a>
                    </div>
                    <div class="sc-295ed20e-3 gGfstY"></div>
                    <div class="sc-295ed20e-6 hbbaJG">
                        <div class="footer-section">
                            <h3>User Experience</h3>
                            <ul>
                                <li><a href="<?= route('register') ?>">Create Wallet</a></li>
                                <li><a href="<?= route('login') ?>">Access Wallet</a></li>
                            </ul>
                        </div>
                        <div class="footer-section">
                            <h3>Assets &amp; DApps</h3>
                            <ul>
                                <li><a href="<?= route('assets') ?>">Assets</a></li>
                            </ul>
                        </div>
                        <div class="footer-section">
                            <h3>More</h3>
                            <ul>
                                <li><a href="<?= route('about') ?>">About Us</a></li>
                                <li><a href="<?= route('contact') ?>">Contact Us</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="sc-295ed20e-3 gGfstY"></div>
                    <div class="sc-295ed20e-2 doQVff footer-bottom">
                        <div class="sc-a090f5c-0 ldryxT">
                            <div class="sc-a090f5c-1 iCrhSG">
                                <div class="sc-a090f5c-3 KWRtG">
                                    <img alt="English Flag" loading="lazy" width="26.78" height="18" decoding="async" data-nimg="1" style="color:transparent;height:100%;width:auto" srcSet="/_next/image?url=%2Fassets%2Fflags%2Fen.png&amp;w=32&amp;q=100 1x, /_next/image?url=%2Fassets%2Fflags%2Fen.png&amp;w=64&amp;q=100 2x" src="_next/en0a08.png?url=%2Fassets%2Fflags%2Fen.png&amp;w=64&amp;q=100" />
                                </div>
                                <div class="sc-a090f5c-4 ckAzMF">English (US)</div>
                            </div>
                        </div>
                        <div class="sc-295ed20e-8 bCMdkz">Copyright © 2024 Ecore Wallet All Rights Reserved</div>
                        <ul class="sc-295ed20e-7 kdAaXo">
                            <li class="sc-a6a6abc8-0 IdRnq policies"><a href="/privacy">Privacy Policy</a></li>
                            <li class="sc-a6a6abc8-0 IdRnq policies"><a href="/terms">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    </footer>

    <!-- Smartsupp Live Chat script -->
    <script type="text/javascript">
        var _smartsupp = _smartsupp || {};
        _smartsupp.key = '4fafbc2b855336f5eaacedb9978d099ace1cd45c';
        window.smartsupp||(function(d) {
            var s,c,o=smartsupp=function(){ o.push(arguments)};o=[];
            s=d.getElementsByTagName('script')[0];c=d.createElement('script');
            c.type='text/javascript';c.charset='utf-8';c.async=true;
            c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
        })(document);
    </script>
    <noscript> Powered by <a href="https://www.smartsupp.com" target="_blank">Smartsupp</a></noscript>
</body>
</html>
