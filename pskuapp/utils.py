def create_list_keys(matched_names,variable_to_match):
    key_list = []
    for i in matched_names:
        key_list.append(i[variable_to_match])
    return key_list