$(function(){
  $("#create_btn").on("click", () => {
    var width = $("#width").val();
    var height = $("#height").val();
    var background_color = $("#background_color").val();
    var text = $("#display_text").val();
    var font_size = $("#font_size").val();
    var position_x = $("#position_x").val();
    var position_y = $("#position_y").val();
    var amount = $("#amount").val();
    var start_num = parseInt($("#start_num").val());
    var add_count = parseInt($("#add_count").val());

    var display_num = start_num;

    for (var i = 0; i < amount; i++) {
      var image_canvas = $("<canvas></canvas>").appendTo("#canvas_area");
      image_canvas.attr("width", width);
      image_canvas.attr("height", height);
      image_canvas.attr("name", text + '_' + display_num);
      $("<br>").appendTo("#canvas_area");

      var ctx = image_canvas[0].getContext('2d');
      ctx.fillStyle = background_color;
      ctx.fillRect(0, 0, width, height);
      ctx.font = font_size + "px serif";
      ctx.fillStyle = "rgba(0, 0, 0)";
      ctx.fillText(text + ' ' + display_num, position_x, position_y);

      display_num += add_count;
    }
  });

  $("#download_btn").on("click", () => {
    const zip = new JSZip();
    const child_nodes = $("#canvas_area").children("canvas");

    let add_to_zip = (zip_obj, canvas, filename) => {
      return new Promise((resolve, reject) => {
        canvas.toBlob(blob => {
          zip_obj.file(filename, blob);
          resolve();
        }, "image/png", 1);
      });
    }

    add_to_zip_array = [];
    for (var i = 0; i < child_nodes.length; i++) {
      var name = $(child_nodes[i]).attr("name");
      add_to_zip_array.push(add_to_zip(zip, child_nodes[i], name + ".png"));
    }

    Promise.all(add_to_zip_array).then(() => {
      zip.generateAsync({type:"blob"}).then(function(compressData) {
        var zip_blob = new Blob([compressData], { 'type': 'application/zip' });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(zip_blob);
        a.download = "dummy.zip";
        a.click();
      });
    });
  });
});
