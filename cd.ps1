# Получаем текущую папку, в которой лежит скрипт
$folderPath = Get-Location

# Устанавливаем разные базовые даты для каждого параметра
$baseCreationDate = Get-Date "2024-09-26 08:00:00"
$baseWriteDate = Get-Date "2024-09-26 19:00:00"
$baseAccessDate = Get-Date "2024-09-26 23:00:00"

# Получаем все файлы и каталоги в текущей папке и подкаталогах
$items = Get-ChildItem -Path $folderPath -Recurse

# Рандомизатор для разброса времени (в пределах 3 часов для каждого параметра)
$random = New-Object System.Random

foreach ($item in $items) {
    # Генерируем рандомное количество минут для каждого параметра
    $randomMinutesCreation = $random.Next(0, 600)
    $randomMinutesWrite = $random.Next(0, 800)
    $randomMinutesAccess = $random.Next(0, 900)

    # Изменяем даты с рандомным разбросом
    $newCreationDate = $baseCreationDate.AddMinutes($randomMinutesCreation)
    $newWriteDate = $baseWriteDate.AddMinutes($randomMinutesWrite)
    $newAccessDate = $baseAccessDate.AddMinutes($randomMinutesAccess)

    # Применяем даты к файлам
    if ($item.PSIsContainer -eq $false) { # Это файл
        $item.CreationTime = $newCreationDate
        $item.LastWriteTime = $newWriteDate
        $item.LastAccessTime = $newAccessDate
        Write-Host "Файл $($item.FullName) обновлён: Creation: $newCreationDate, Write: $newWriteDate, Access: $newAccessDate"
    }
}

# Теперь обрабатываем каталоги отдельно, основываясь на файлах внутри них
$directories = Get-ChildItem -Path $folderPath -Recurse -Directory

foreach ($directory in $directories) {
    # Получаем все файлы в текущем каталоге
    $filesInDir = Get-ChildItem -Path $directory.FullName | Where-Object { -not $_.PSIsContainer }

    if ($filesInDir.Count -gt 0) {
        # Находим самую раннюю дату создания среди файлов в каталоге
        $earliestCreation = ($filesInDir | Sort-Object CreationTime)[0].CreationTime
        $latestWrite = ($filesInDir | Sort-Object LastWriteTime -Descending)[0].LastWriteTime
        $latestAccess = ($filesInDir | Sort-Object LastAccessTime -Descending)[0].LastAccessTime

        # Применяем эти даты к каталогу
        $directory.CreationTime = $earliestCreation
        $directory.LastWriteTime = $latestWrite
        $directory.LastAccessTime = $latestAccess

        Write-Host "Каталог $($directory.FullName) обновлён: Creation: $earliestCreation, Write: $latestWrite, Access: $latestAccess"
    }
    else {
        Write-Host "Каталог $($directory.FullName) пуст, пропускаем."
    }
}