        this.displayHTML = function () {
            
            var openingHTML= '<div class="card d-inline-block" style="width: 18rem;"><img class="card-img-top" src="assets/images/' + this.name + '.jpg" alt="Card image cap"> <div class="card-body"><p class="card-text">HP: ' + this.hp + '</p>'
            var buttonHTML = '<p><button type="button" class="btn-char btn btn-primary" ' + 'value ="' + this.name + '" >Choose</button></p>';
            var closingHTML = '</div></div>';

            if (this.isDefender){
                return openingHTML +closingHTML;
            }else{
                return openingHTML + buttonHTML + closingHTML;
            }
        }