<%@include file="partials/header.jsp" %>

<div ng-controller="clientDetailsController as client">

    <!-- Clients Resume Subbar -->
    <div ng-class="{sales_page: client.tabs[1].active || client.tabs[2].active}" class="subbar_area shopsview_page">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="subbar_list">

                        <!-- Sub Order text -->
                        <div class="order_list">
                            <div class="order_list_title">
                                <a title="Back to list" class="backto_list pointer" ng-href="{{ client.urls.linkToClientsList() }}">
                                    <img width="6" src="assets/images/left-arrow.png" alt="Back to list">
                                    Back to list
                                </a>
                                <a title="{{ client.info.name }}" href="#" class="tesco_express">
                                    {{ client.info.name }}
                                </a>
                                <a ng-show="client.info.active" ng-click="client.suspend()"
                                   title="Suspend Account" class="suspend_account"
                                   href="#">
                                    Suspend Account
                                </a>
                                <a ng-show="!client.info.active" ng-click="client.restore()"
                                   title="Suspend Account" class="restore_account"
                                   href="#">
                                    Restore Account
                                </a>
                            </div>
                        </div>

                        <!-- Order List Filter Area -->
                        <div class="filter_list">
                            <div class="search_bar" ng-show="client.tabs[1].active || client.tabs[2].active">
                                <form action="">
                                    <div class="search_box">
                                        <button type="submit">
                                            <img width="15" alt="Search Ico" src="assets/images/search.png">
                                        </button>
                                        <input type="text" placeholder="Search" ng-model="client.searchText"
                                               ng-change="client.searchTable()">
                                    </div>
                                </form>
                            </div>

                            <div class="right_side_list">
                                <ul>
                                    <li ng-class="{active: client.tabs[0].active}">
                                        <a class="pointer" ng-click="client.setTab(0)" title="Resume">Resume</a>
                                    </li>
                                    <li ng-class="{active: client.tabs[1].active}">
                                        <a class="pointer" ng-click="client.setTab(1)" title="Orders">Orders</a>
                                    </li>
                                    <li ng-class="{active: client.tabs[2].active}">
                                        <a class="pointer" ng-click="client.setTab(2)" title="Reviews">Reviews</a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- / Clients Resume Subbar -->


    <!-- Resume tab -->
    <div ng-show="client.tabs[0].active">
        <%@include file="modules/client/client-resume.jsp" %>
    </div>
    <!-- /Resume tab -->


    <!-- Orders tab -->
    <div ng-show="client.tabs[1].active">
        <%@include file="modules/client/client-orders.jsp" %>
    </div>
    <!-- /Orders tab -->


    <!-- Reviews tab -->
    <div ng-show="client.tabs[2].active">
        <%@include file="modules/client/client-reviews.jsp" %>
    </div>
    <!-- /Reviews tab -->

</div>

<%@include file="partials/footer.jsp" %>