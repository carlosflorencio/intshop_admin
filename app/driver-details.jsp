<%@include file="partials/header.jsp" %>

<div ng-controller="driverDetailsController as driver">

    <!-- Drivers Resume Subbar -->
    <div ng-class="{sales_page: driver.tabs[1].active}" class="subbar_area shopsview_page">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="subbar_list">

                        <!-- Sub Order text -->
                        <div class="order_list">
                            <div class="order_list_title">
                                <a title="Back to list" class="backto_list pointer" ng-href="{{ driver.urls.linkToDriversList() }}">
                                    <img width="6" src="assets/images/left-arrow.png" alt="Back to list">
                                    Back to list
                                </a>
                                <a title="{{ driver.info.name }}" href="#" class="tesco_express">
                                    {{ driver.info.name }}
                                </a>
                                <a ng-show="driver.info.active" ng-click="driver.suspend()"
                                   title="Suspend Account" class="suspend_account"
                                   href="#">
                                    Suspend Account
                                </a>
                                <a ng-show="!driver.info.active" ng-click="driver.restore()"
                                   title="Suspend Account" class="restore_account"
                                   href="#">
                                    Restore Account
                                </a>
                            </div>
                        </div>

                        <!-- Order List Filter Area -->
                        <div class="filter_list">
                            <div class="search_bar" ng-show="driver.tabs[1].active">
                                <form action="">
                                    <div class="search_box">
                                        <button type="submit">
                                            <img width="15" alt="Search Ico" src="assets/images/search.png">
                                        </button>
                                        <input type="text" placeholder="Search" ng-model="driver.searchText"
                                               ng-change="driver.searchTable()">
                                    </div>
                                </form>
                            </div>

                            <div class="right_side_list">
                                <ul>
                                    <li ng-class="{active: driver.tabs[0].active}">
                                        <a class="pointer" ng-click="driver.setTab(0)" title="Resume">Resume</a>
                                    </li>
                                    <li ng-class="{active: driver.tabs[1].active}">
                                        <a class="pointer" ng-click="driver.setTab(1)" title="Deliverys">Deliverys</a>
                                    </li>
                                    <li ng-class="{active: driver.tabs[2].active}">
                                        <a class="pointer" ng-click="driver.setTab(2)" title="Invoices">Invoices</a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- / Drivers Resume Subbar -->


    <!-- Resume tab -->
    <div ng-show="driver.tabs[0].active">
        <%@include file="modules/driver/driver-resume.jsp" %>
    </div>
    <!-- /Resume tab -->


    <!-- Deliverys tab -->
    <div ng-show="driver.tabs[1].active">
        <%@include file="modules/driver/driver-deliverys.jsp" %>
    </div>
    <!-- /Deliverys tab -->


    <!-- Invoices tab -->
    <div ng-show="driver.tabs[2].active">
        <%@include file="modules/driver/driver-invoices.jsp" %>
    </div>
    <!-- /Invoices tab -->

</div>

<%@include file="partials/footer.jsp" %>