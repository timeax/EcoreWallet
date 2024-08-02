<?php
$show_if_user = function (string $value, string $otherwise = '') use ($user) {
    if (!is_null($user)) {
        return $value;
    }

    return $otherwise;
}
?>

<header>
    <div class="logo">
        <a href="/">
            <img src="https://uploads-ssl.webflow.com/631c2a6f341fb51bba7a6369/66622558914e4ce4934a76b3_ecore-horizontal-logo.png" alt="Ecore Wallet Logo" loading="lazy">
        </a>
    </div>

    <!-- Mobile Navigation -->
    <nav class="mobile-nav">

        <div class="sc-93665a12-1 HTQke active">
            <div class="sc-93665a12-2 bGJvVE">
                <div class="sc-93665a12-4 ldzhSI">

                    <!-- Platforms Dropdown -->
                    <div class="sc-5692c90e-0 hMlcIe">
                        <div class="sc-e3ed9ea-0 eFpmkK">
                            <div class="sc-e3ed9ea-1 haYSVM">
                                <span class="sc-e3ed9ea-3 dBGINm">User Experience</span>
                            </div>
                            <div class="sc-e3ed9ea-2 kaTTqP inactive">
                                <svg viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg" class="sc-a38f282c-0 bEInhd">
                                    <path d="M1 1L7 7L13 1" stroke="inherit" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </div>
                        </div>
                        <div class="sc-9451acbe-0 fWgZeL inactive">
                            <div class="sc-9451acbe-1 fORfAv">
                                <a target="" class="sc-31f954b4-0 jYFLVW" href="<?= $show_if_user(route('user.dashboard'), route('register')) ?>">
                                    <div class="sc-31f954b4-1 jNObVF header-icon-container">
                                        <img alt="Mobile Wallet" loading="lazy" width="24" height="24" decoding="async" data-nimg="1" class="sc-31f954b4-2 jenLMQ" style="color:transparent" srcset="https://uploads-ssl.webflow.com/631c2a6f341fb51bba7a6369/6662e4ca5acb80e97ac3970e_add-asset.webp" src="https://uploads-ssl.webflow.com/631c2a6f341fb51bba7a6369/6662e4ca5acb80e97ac3970e_add-asset.webp">
                                    </div>
                                    <div class="sc-31f954b4-3 rGUKM">
                                        <span class="sc-31f954b4-4 iVjIoN"><?= $show_if_user('View Dashboard', 'Create Wallet') ?></span>
                                        <p class="sc-31f954b4-5 fRqzXQ"><?= $show_if_user('Get the ultimate crypto suite', 'Go to the dashboard page') ?></p>
                                    </div>
                                </a>
                                <?php if (is_null($user)) : ?>
                                    <a target="" class="sc-31f954b4-0 jYFLVW" href="<?= route('login') ?>">
                                        <div class="sc-31f954b4-1 jNObVF header-icon-container">
                                            <img alt="Mobile Wallet" loading="lazy" width="24" height="24" decoding="async" data-nimg="1" class="sc-31f954b4-2 jenLMQ" style="color:transparent" srcset="https://uploads-ssl.webflow.com/631c2a6f341fb51bba7a6369/6662e1b3d07fadd96c17ec65_mobile.webp" src="https://uploads-ssl.webflow.com/631c2a6f341fb51bba7a6369/6662e1b3d07fadd96c17ec65_mobile.webp">
                                        </div>
                                        <div class="sc-31f954b4-3 rGUKM">
                                            <span class="sc-31f954b4-4 iVjIoN">Access Wallet</span>
                                            <p class="sc-31f954b4-5 fRqzXQ">Complete control on the go</p>
                                        </div>
                                    </a>
                                <?php endif; ?>
                            </div>
                        </div>
                    </div>

                    <!-- Assets & DApps Dropdown -->
                    <div class="sc-5692c90e-0 hMlcIe">
                        <div class="sc-e3ed9ea-0 eFpmkK">
                            <div class="sc-e3ed9ea-1 haYSVM">
                                <span class="sc-e3ed9ea-3 dBGINm">Assets & DApps</span>
                            </div>
                            <div class="sc-e3ed9ea-2 kaTTqP inactive">
                                <svg viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg" class="sc-a38f282c-0 bEInhd">
                                    <path d="M1 1L7 7L13 1" stroke="inherit" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </div>
                        </div>
                        <div class="sc-9451acbe-0 fWhdUf hidden">
                            <div class="sc-9451acbe-1 fORfAv">
                                <a target="" class="sc-31f954b4-0 jYFLVW" href="/about">
                                    <div class="sc-31f954b4-1 jNObVF header-icon-container">
                                        <img alt="Assets" loading="lazy" width="24" height="24" decoding="async" data-nimg="1" class="sc-31f954b4-2 jenLMQ" style="color:transparent" srcset="https://uploads-ssl.webflow.com/631c2a6f341fb51bba7a6369/6662dd0000ec784019f79606_assets.webp" src="https://uploads-ssl.webflow.com/631c2a6f341fb51bba7a6369/6662dd0000ec784019f79606_assets.webp">
                                    </div>
                                    <div class="sc-31f954b4-3 rGUKM">
                                        <span class="sc-31f954b4-4 iVjIoN">About Us</span>
                                        <p class="sc-31f954b4-5 fRqzXQ">learn About Ecore</p>
                                    </div>
                                </a>
                                <a target="" class="sc-31f954b4-0 jYFLVW" href="<?= route('assets') ?>">
                                    <div class="sc-31f954b4-1 jNObVF header-icon-container">
                                        <img alt="Assets" loading="lazy" width="24" height="24" decoding="async" data-nimg="1" class="sc-31f954b4-2 jenLMQ" style="color:transparent" srcset="https://uploads-ssl.webflow.com/631c2a6f341fb51bba7a6369/6662df394c4585605900a4b1_b1.png" src="https://uploads-ssl.webflow.com/631c2a6f341fb51bba7a6369/6662df394c4585605900a4b1_b1.png">
                                    </div>
                                    <div class="sc-31f954b4-3 rGUKM">
                                        <span class="sc-31f954b4-4 iVjIoN">Assets</span>
                                        <p class="sc-31f954b4-5 fRqzXQ">Supported Chains & tokens</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Resources Dropdown -->
                    <div class="sc-5692c90e-0 hMlcIe">
                        <div class="sc-e3ed9ea-0 eFpmkK">
                            <div class="sc-e3ed9ea-1 haYSVM">
                                <span class="sc-e3ed9ea-3 dBGINm">Resources</span>
                            </div>
                            <div class="sc-e3ed9ea-2 kaTTqP inactive">
                                <svg viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg" class="sc-a38f282c-0 bEInhd">
                                    <path d="M1 1L7 7L13 1" stroke="inherit" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </div>
                        </div>
                        <div class="sc-9451acbe-0 fWgZYw hidden">
                            <div class="sc-9451acbe-1 fORfAv">
                                <a target="" class="sc-31f954b4-0 jYFLVW" href="<?= route('contact') ?>">
                                    <div class="sc-31f954b4-1 jNObVF header-icon-container">
                                        <img alt="Blog" loading="lazy" width="24" height="24" decoding="async" data-nimg="1" class="sc-31f954b4-2 jenLMQ" style="color:transparent" srcset="https://uploads-ssl.webflow.com/631c2a6f341fb51bba7a6369/666a4ea7c3ed10d12e401068_live-support.webp" src="https://uploads-ssl.webflow.com/631c2a6f341fb51bba7a6369/666a4ea7c3ed10d12e401068_live-support.webp">
                                    </div>
                                    <div class="sc-31f954b4-3 rGUKM">
                                        <span class="sc-31f954b4-4 iVjIoN">Contact Us</span>
                                        <p class="sc-31f954b4-5 fRqzXQ">Reach out for support or inquiries</p>
                                    </div>
                                </a>

                            </div>
                        </div>
                    </div>

                    <!-- Company Dropdown -->

                </div>
            </div>
        </div>

    </nav>

    <!-- Desktop Navigation -->
    <nav class="desktop-nav">
        <a href="/">Home</a>
        <a href="<?= route('about') ?>">About Us</a>
        <a href="<?= route('assets') ?>">Assets</a>
        <a href="<?= route('contact') ?>">Contact Us</a>
        <?php if (!is_null($user)) : ?>
            <a class="sc-d5d30c6f-0 kFxYQp" target href="<?= route('user.dashboard') ?>">Dashboard</a>
        <?php else : ?>
            <a class="sc-d5d30c6f-0 kFxYQp" target href="<?= route('register') ?>">Register Wallet</a>
        <?php endif; ?>
    </nav>

    <div class="hamburger" onclick="toggleNav()">
        <div class="hamburger-lines"></div>
        <div class="hamburger-lines"></div>
        <div class="hamburger-lines"></div>
    </div>
</header>

<!-- Your content here -->

<script>
    function toggleNav() {
        const mobileNav = document.querySelector('.mobile-nav');
        const hamburger = document.querySelector('.hamburger');
        mobileNav.classList.toggle('open');
        hamburger.classList.toggle('open');
        document.body.classList.toggle('mobile-nav-open'); // Toggle body class for overflow:hidden
    }
</script>
