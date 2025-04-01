import os

def print_folder_structure(folder_path):
    """
    Prints the folder structure including filenames and content of all files inside the given folder path.
    """
    for root, dirs, files in os.walk(folder_path):
        # Print directory name
        level = root.replace(folder_path, '').count(os.sep)
        indent = ' ' * 4 * level
        print(f"{indent}[{os.path.basename(root)}]/")
        
        # Print file names and their content
        for file in files:
            file_path = os.path.join(root, file)
            file_indent = ' ' * 4 * (level + 1)
            print(f"{file_indent}{file}")
            
            # Read and print file content
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    content_indent = ' ' * 4 * (level + 2)
                    for line in content.splitlines():
                        print(f"{content_indent}{line}")
            except Exception as e:
                print(f"{file_indent}Could not read file: {e}")

# Example usage
folder_path = "C:/Projects/CO-PO/co_po_web/server/models"
print_folder_structure(folder_path)