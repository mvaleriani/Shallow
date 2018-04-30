import datetime
from openpyxl import load_workbook # Loading excel sheet
from string import ascii_uppercase # Alphabet

def record_row(history, record_obj, epoch_times):
    workbook = load_workbook(filename = record_obj['path_to_excel_sheet'])
    worksheet = workbook.active # Gets active sheet
    
    starting_cell_num = get_starting_row(worksheet)
    
    train_loss = history.history['loss']
    train_acc = history.history['categorical_accuracy']
    val_loss = history.history['val_loss']
    val_acc = history.history['val_categorical_accuracy']

    train_loss_percentages = get_percentages(train_loss)
    train_acc_percentages = get_percentages(train_acc)
    val_loss_percentages = get_percentages(val_loss)
    val_acc_percentages = get_percentages(val_acc)

    avg_train_loss = get_average(train_loss)
    avg_train_acc = get_average(train_acc)
    avg_val_loss = get_average(val_loss)
    avg_val_acc = get_average(val_acc)
    
    epoch_avg = get_average_times(epoch_times)

    data_list = list() 
    data_list.append(record_obj['model_version'])
    data_list.append(record_obj['loss_function'])
    data_list.append(record_obj['momentum'])
    data_list.append(record_obj['learning_rate'])
    data_list.append(record_obj['metrics'])
    data_list.append(record_obj['weights'])
    data_list.append(record_obj['nb_train_samples'])
    data_list.append(record_obj['batch_size'])
    data_list.append(record_obj['nb_validation_samples'])
    data_list.append(record_obj['epochs'])
    data_list.append(epoch_avg)
    data_list.append(train_loss_percentages)
    data_list.append(train_acc_percentages)
    data_list.append(avg_train_loss)
    data_list.append(avg_train_acc)
    data_list.append(val_loss_percentages)
    data_list.append(val_acc_percentages)
    data_list.append(avg_val_loss)
    data_list.append(avg_val_acc)
    data_list.append(str(datetime.datetime.now()))
    data_list.append(record_obj['notes'])

    alphabet_list = list(ascii_uppercase)
    counter = 0

    while (alphabet_list[counter] != 'V'):
        worksheet[alphabet_list[counter] + str(starting_cell_num)] = data_list[counter]
        counter += 1

    workbook.save(filename = record_obj['path_to_excel_sheet'])
    
def get_starting_row(worksheet):
    starting_cell_number = 3
    starting_cell = 'A' + str(starting_cell_number)

    while (worksheet[starting_cell].value != None):
        starting_cell_number += 1
        starting_cell = 'A' + str(starting_cell_number)

    return starting_cell_number

def get_average(arr):
    num_of_elements = len(arr)
    sum_of_elements = 0.0

    for value in arr:
        sum_of_elements += value
    
    return str(round(((sum_of_elements / num_of_elements) * 100), 2)) + '% '

def get_average_times(arr):
    num_of_elements = len(arr)
    sum_of_elements = 0.0

    for value in arr:
        sum_of_elements += value
    
    return str(round((sum_of_elements / num_of_elements), 2)) + "s "

def get_percentages(arr):
    string = ""

    for value in arr:
        string += str(round((value * 100), 2)) + '% '
    
    return string

def get_times(arr):
    string = ""

    for value in arr:
        string += str(round(value, 2)) + "s "

    return string