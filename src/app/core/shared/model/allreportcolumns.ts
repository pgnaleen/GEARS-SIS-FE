
export class AllReportColumns {
    allColumns: ReportColumn[] = [];
}

export class ReportColumn {
    table_name: string;
    table_display_name: string;
    column_name: string;
    column_display_name: string;
    column_data_type: string;
    filter: string;
}
