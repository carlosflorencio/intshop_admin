<!DOCTYPE html>
<html lang="en" ng-app="intshop">
<head>
    <meta charset="utf-8">
    <meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>IntShop Admin</title>

    <!-- Styles -->
    <link href="https://fonts.googleapis.com/css?family=Oxygen:400,700,300" rel="stylesheet" type="text/css">
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.datatables.net/1.10.11/css/jquery.dataTables.min.css" rel="stylesheet">
    <link href="assets/dist/all.css" rel="stylesheet">

    <!-- Scripts (CDN to be faster) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.3/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.12.0/lodash.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/restangular/1.5.2/restangular.min.js"></script>
    <script src="https://cdn.datatables.net/1.10.11/js/jquery.dataTables.min.js"></script>
    <script src="assets/dist/scripts.js"></script>
    <script src="assets/dist/app.js"></script>

    <!--[if lt IE 9]>
    <script src="http://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="http://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body>


<div class="top_bar">
    <div class="container">
        <div class="row">
            <div class="col-sm-12">

                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                </div>

                <!-- Top logo -->
                <div class="header_logo">
                    <div class="logo">
                        <a href="index.html"><img src="assets/images/logo.png" alt="ONO Logo"></a>
                    </div>
                </div>

                <!-- Top menu -->
                <div class="top_menu">
                    <div class="dashboard_menu navbar-collapse collapse">
                        <ul id="menu" class="loged_user_menu nav navbar-nav">
                            <li class="active"><a href="shops.html">Shops</a></li>
                            <li><a href="drivers.html">Drivers</a></li>
                            <li><a href="orders.html">Orders List</a></li>
                            <li><a href="clients.html">Clients</a></li>
                        </ul>
                    </div>

                    <!-- User profile -->
                    <div class="user_profile">
                        <div class="loged_user_dropdown">
                            <ul>
                                <li class="has_dropdown dropdown">
                                    <button class="dropdown-toggle" type="button" data-toggle="dropdown">
                                        <span class="profile_image"><img src="assets/images/profile-image.jpg" alt="User Name"></span>
                                        <span class="angle_down"><img src="assets/images/arrow_down_gray.png" alt=""></span>
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li><a href="#">Profile</a></li>
                                        <li><a href="#">Setting</a></li>
                                        <li><a href="login.html">Log out</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>