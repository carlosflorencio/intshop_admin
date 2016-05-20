<%@include file="partials/header.jsp" %>

<script type="text/javascript">
    google.charts.load('current', {packages: ['corechart', 'bar']});
    google.charts.setOnLoadCallback(drawBasic);

    function drawBasic() {
        var data = google.visualization.arrayToDataTable([
            ['Element', 'Sales', {role: 'style'}],
            ['6h', 8, '#3493d5'],            // RGB value
            ['12h', 10, '#3493d5'],            // English color name
            ['24h', 19, '#3493d5'],
            ['total', 21, 'color: #3493d5'] // CSS-style declaration
        ]);

        var options = {
            legend: {position: 'none'},
            vAxis: {
                gridlines: {
                    color: 'transparent'
                }
            }
        };

        var chart = new google.visualization.ColumnChart(
                document.getElementById('chart_div'));

        chart.draw(data, options);
    }
</script>

<div ng-controller="shopDetailsController as shopDetails">

    <div class="subbar_area shopsview_page">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="subbar_list">

                        <!-- Sub Order text -->
                        <div class="order_list">
                            <div class="order_list_title">
                                <a class="backto_list" href="shops.jsp">
                                    <img width="6" src="assets/images/left-arrow.png" alt="">
                                    Back to list</a>
                                <a href="#" class="tesco_express">{{ info.storeName }}</a>
                            </div>
                        </div>

                        <!-- Order List Filter Area -->
                        <div class="filter_list">
                            <div class="right_side_list">
                                <ul>
                                    <li class="active">
                                        <a href="shops-resume.html">Resume</a>
                                    </li>
                                    <li>
                                        <a href="shops-sales.html">Sales</a>
                                    </li>
                                    <li>
                                        <a href="shops-invoices.html">Invoices</a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>


</div>

<%@include file="partials/footer.jsp" %>