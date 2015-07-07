var current_size = [];
var target_size = [];
var original_size = [];
var tar_size = Math.min(($(window).height()/2)  - 50, ($(window).width()/2)  - 50);

var titles = ["2D Fluid Simulation", "Jeometry Wars", "Jeometry Wars", "Ray Trace Lighting", "Minecraft Clone", "Projection Matrix Render", "Projection Matrix Render", "Ray Trace Lighting", "Ray Trace Render", "Ray Trace Render"];

var subtitles = ["Java <a href='projects/fluiddemo.zip'>demo</a>", "Java <a href='projects/jometrywars.zip'>demo</a>", "Java <a href='projects/jometrywars.zip'>demo</a>", "Java <a href='projects/Lighting.zip'>demo</a>", "C", "Java <a href='projects/Projection.zip'>demo</a>", "Java <a href='projects/Projection.zip'>demo</a>", "Java <a href='projects/Projection.zip'>demo</a>", "Java", "Java"];

function expand(x){
	var idx = parseInt(($(x).parent().attr("id")).slice(-1));
	if(Math.abs(current_size[idx] - original_size[idx]) > Math.abs(current_size[idx] - target_size[idx])) {
		target_size[idx] = original_size[idx];
		$(x).removeClass("large");
	}else{
		target_size[idx] = tar_size;
		$(x).addClass("large");
	}
	$("span").each(function(index){
		if(idx != index) {
			target_size[index] = original_size[index];
			$("#img" + index).removeClass("large");
		}
	});
}

$( document ).ready(function() {
	$("span").last().remove();
	$("canvas").first().remove();
	
	$("span").each(function(index){
		if($(window).width() < 550 || $(window).height() < 550) {
			$(this).append("<p class='title' style='top: calc(24% - 55px);'>" + titles[index] + "</p><img id='img" + index + "' src='Images/" + (index+1) + ".png' onmousedown='expand(this)'>");
		} else {
			$(this).append("<p class='title'>" + titles[index] + "</p><img id='img" + index + "' src='Images/" + (index+1) + ".png' onmousedown='expand(this)'><p class='subtitle'>" + subtitles[index] + "</p>");
		}
	});
	
});