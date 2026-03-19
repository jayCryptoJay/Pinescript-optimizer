def extract_parameters(pine_script_code):
    import re

    # Regular expression patterns to find variable declarations and input parameters
    variable_pattern = re.compile(r'(?:(var|input)[\s]+[\w]+)')
    input_pattern = re.compile(r'input\((.*?)(,.*?){0,2}\)')

    # Find all variable declarations
    variable_declarations = variable_pattern.findall(pine_script_code)
    # Find all input parameters
    input_parameters = input_pattern.findall(pine_script_code)

    # Extract and clean parameters
    variables = [var.strip() for var in variable_declarations]
    inputs = [param[0].strip() for param in input_parameters]

    # Combine and return unique tunable parameters
    tunable_parameters = set(variables + inputs)
    return list(tunable_parameters)

# Example usage:
# pine_script = "//@version=5\ninput int length = 14\nvar float myVar = 0.5"
# print(extract_parameters(pine_script))
