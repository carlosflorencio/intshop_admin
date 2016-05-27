<%@include file="partials/header.jsp" %>

<div>

    <!-- Sub Bar -->
    <div class="subbar_area shopsview_page dashboard_subbar">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="subbar_list">

                        <!-- Sub Order text -->
                        <div class="order_list">
                            <div class="order_list_title">
                                <p>Profile</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- / Sub Bar -->


    <!-- Main Content Area -->
    <div class="data_table_area shopsview_table dashboard_page">
        <div class="container">
            <div class="row">

                <!-- Left Side Content -->
                <div class="col-sm-6">
                    <div class="left_column dashboard_progress">
                        <div class="profile_image_section">
                            <div class="left_profile_image">
                                <img width="80" src="assets/images/user-image.jpg" alt="Profile Image">
                            </div>
                            <div class="right_profile_text">
                                <h4>Profile Image</h4>
                                <p>Upload your avatar image. That image will be<br />
                                    displayed only for you.</p>
                                <a href="#" class="upload_button">Upload</a>
                            </div>
                        </div>

                        <div class="profile_name_change_form">
                            <div class="form-group">
                                <input type="text" placeholder="Jorge Almeida">
                            </div>
                            <div class="form-group">
                                <input type="email" placeholder="myemail@gmail.com">
                            </div>
                            <div class="form-group">
                                <input type="text" placeholder="Mobile Number">
                            </div>
                            <div class="form-group reset_submit_button">
                                <input type="reset" value="Discard">
                                <input type="submit" value="Save Changes">
                            </div>
                        </div>

                    </div>

                </div>
                <!-- / Left Side Content -->

                <!-- Right Side Content -->
                <div class="col-sm-6">
                    <div class="right_column dashboard_right_column">

                        <div class="change_password_section">
                            <h3>Change Password</h3>

                            <div class="password_changes_form">
                                <div class="form-group">
                                    <input type="password" placeholder="Old Password">
                                    <input type="password" placeholder="New Password">
                                    <input type="password" placeholder="Repeat New Password">
                                </div>

                                <div class="form-group">
                                    <div class="google_recaptcha">
                                        <div class="g-recaptcha" data-sitekey="6Lc_0f4SAAAAAF9ZA_d7Dxi9qRbPMMNW-tLSvhe6"></div>
                                    </div>
                                </div>

                                <div class="form-group text-center">
                                    <input type="submit" value="Apply new password">
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <!--/ Right Side Content -->

            </div>

        </div>
    </div>
    <!-- / Main Content Area -->
</div>

<%@include file="partials/footer.jsp" %>
