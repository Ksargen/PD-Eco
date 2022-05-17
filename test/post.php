 <div>
	<h1> <?= $vivod['title'] ?></h1>
	<h5> <?= $vivod['date'] ?></h5>
	<p> <?= $vivod['text'] ?> </p>
	<br>
	<div>
		<span> Лайков: <?= $vivod['likes'] ?> </span>
		<span> Просмотров: <?= $vivod['views'] ?> </span>
	</div>


</div> 
if ($_SERVER['REQUEST_METHOD'] == 'GET')