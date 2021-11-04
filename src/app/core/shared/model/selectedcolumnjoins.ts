export class SelectedColumnJoins {
    joinsOfUserSelectedColumns: ColumnJoin[] = [];
}

export class ColumnJoin {
    report_table: string;
    report_table_display_name: string;
    report_column: string;
    report_column_display_name: string;
    join_table: string;
    join_table_display_name: string;
    join_column: string;
    join_column_display_name: string;
    join_checked: boolean;
}
