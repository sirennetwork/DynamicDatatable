# DynamicDatatable
Dynamic Datatable for bootstrap jquery

use data-url attribute to set url where data can be fetched from

# features
1) Condition Handling,
   Note: when using data-condition_render do not use data-condition_render="" like this, Use it like this: data-condition_render=''
   
2) Data Rendering
3) curly brace support to manipulate your data, e.g Hi my name is {fname}. this will only work with data-render or data-condition_render attribute.
4) write your own html styling using data-render="true" and data-render_html="Your HTML", e.g &lt;th data-render="true" data-render_html="Hi, my email is {email}"&gt;&lt;/th&gt;

# How to display data?
in you th set id="key". e.g: &lt;th id="fname"&gt;First Name&lt;/th&gt;

# Responsive Datatable
To Initiate datatable, Add class "commonDataTable" to ypur table

add data-responsive="true" in table tag to make the datatable responsive. e.g: "&lt;table class="commonDataTable" data-responsive="true"&gt;"

You can view the html code to get more better idea.
