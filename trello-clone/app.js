$(document).ready(function() {
    function initSort() {
        // Sort card
        $(".card-container").sortable({
            cursor: "move",
            connectWith: ".card-container",
            helper: "clone",
            placeholder: "card-placeholder",
            // highlight effect when card is droped in a list
            receive: function (event, ui) {
                ui.item.effect({
                    effect: "highlight", 
                    duration: 800,
                })
                console.log(event, ui); 
            }
        
        });

        $(".list").draggable({
            snap: ".column"    
        });

        $(".column").droppable({
            accept: ".list"
        });
    }  
    
    initSort();

    function initRemove () {
        // Remove card on click
        $('body').on('click', '.card .remove-card' , function(e){
            $(this).closest('.card').remove();
        });
    
        // Remove list on click
        $('body').on('click', '.list .remove-list' , function(e){
            $(this).closest('.column').remove();
        });
    }

    initRemove();

   // Click to add new card or edit them
    var $editMode;
    var $editCard;

    function initEdit() {
        $('body').on('click', '.edit-card' , function(e){
            $editCard = $(this).closest('.card');
            $editMode = true;
            $('#cardName').val($editCard.data('name'));
            dialog.dialog("open");
            return false;        
        });
    }

    initEdit();

    function initCreate() {
        $('.add-new-card').click(function() {
            $('#cardName, #cardDescription').val('');
            $cardContainer = $(this).parent().find('.card-container');
            dialog.dialog("open");    
            $editMode = false;
        }); 
    }

    initCreate();

    // New card container
    var $cardContainer;

    function addCard(event) {
        var name = $('#cardName').val();
        var dueDate = $('#dueDate').val();

        var cardHtml = `
            <div class="card" data-name="`+name+`">
                <div class="card-content">
                    <a class="edit-card card-name">`+name+`</a>
                    <span class="content-right">   
                        <span class="card-due-date">`+dueDate+`</span>
                        <button class="remove-card">X</button>
                    </span>
                </div>
            </div>
        `;

        $cardContainer.append(cardHtml);
    
    }

    function editCard(event) {
        var name = $('#cardName').val();
        var dueDate = $('#dueDate').val();
        $editCard.find(".card-name").text(name);
        $editCard.find(".card-due-date").text(dueDate);
    }

    function saveCard(event){
        event.preventDefault();
        if ($editMode) {
            editCard(event);
        } else {
            addCard(event);
        }

        dialog.dialog("close");
    }

    // Dialog for card form 
    dialog = $('#cardForm').dialog({
        autoOpen: false,
        height: 500,
        width: 300,
        modal: true,
        show: {effect: "drop"},
        buttons: {
            Save: saveCard,
            Cancel: function() {
                dialog.dialog("close");

            }
        }    
    });

    // Tabs in dialog 
    // $('#cardFormTabs').tabs({
    //     event: "mouseover"
    // });

    // Datepicker Plugin
    //$('.date-input').dateDropper();

    // Color Widget
    var colors = ['#ffd3da',
    'rgb(82, 122, 146)', 
    'rgb(95, 52, 77)', 
    'rgb(255, 178, 133)', 
    'rgb(169, 236, 253)', 
    'rgb(53, 138, 117)', 
    'lightgrey'];

    $("#backgroundColor").color({
        colors: colors, 
        targetSelector: "body", 
        selectedIndex:1
    });

    $("#buttonColor").color({
        colors: colors, 
        targetSelector: ".add-new-card, .add-new-list",
        selectedIndex:1
    });
});


